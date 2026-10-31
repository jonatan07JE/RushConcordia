import { useEffect, useRef, useState } from "react";
import { formatPrice } from "../drinks.js";
import {
  deleteCustomDrink,
  getCustomDrinks,
  hasImportedMenuCatalog,
  importMenuCatalog,
  saveCustomDrink,
  updateCustomDrink,
} from "../drinkStore.js";
import supabase from "../supabaseClient.js";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

function compressPhoto(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const imageUrl = URL.createObjectURL(file);

    image.onload = () => {
      const maxDimension = 1200;
      const scale = Math.min(
        1,
        maxDimension / Math.max(image.naturalWidth, image.naturalHeight),
      );
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.naturalWidth * scale);
      canvas.height = Math.round(image.naturalHeight * scale);
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(imageUrl);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error("No se pudo procesar la imagen."));
    };

    image.src = imageUrl;
  });
}

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [editingDrink, setEditingDrink] = useState(null);
  const [customDrinks, setCustomDrinks] = useState([]);
  const [showAdditionalDrinks, setShowAdditionalDrinks] = useState(false);
  const [catalogImported, setCatalogImported] = useState(false);
  const [isImportingCatalog, setIsImportingCatalog] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [catalogMessage, setCatalogMessage] = useState("");
  const [catalogError, setCatalogError] = useState("");
  const fileInput = useRef(null);

  useEffect(() => {
    document.title = "Administración — Rush Concordia";
    let active = true;

    async function checkSession() {
      if (!supabase) {
        setAuthLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!active) return;
      await verifyAdmin(session?.user ?? null);
    }

    async function verifyAdmin(currentUser) {
      setUser(currentUser);
      if (!currentUser) {
        setIsAdmin(false);
        setAuthLoading(false);
        return;
      }

      const { data, error: authorizationError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", currentUser.id)
        .maybeSingle();

      if (!active) return;
      setIsAdmin(Boolean(data) && !authorizationError);
      setAuthLoading(false);
      if (data && !authorizationError) {
        try {
          const [savedDrinks, imported] = await Promise.all([
            getCustomDrinks(),
            hasImportedMenuCatalog(),
          ]);
          if (!active) return;
          setCustomDrinks(savedDrinks);
          setCatalogImported(imported);
        } catch (loadError) {
          if (active) setError(loadError.message || "No se pudieron cargar las bebidas guardadas.");
        }
      }
    }

    checkSession();
    return () => {
      active = false;
      document.title = "Rush Concordia — Café para cambiar el ritmo";
    };
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setAuthLoading(true);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: loginEmail.trim(),
      password: loginPassword,
    });

    if (loginError) {
      setAuthLoading(false);
      setError("No se pudo iniciar sesión. Revisa el correo y la contraseña.");
      return;
    }

    const { data: adminRecord, error: authorizationError } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (authorizationError || !adminRecord) {
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
      setAuthLoading(false);
      setError("Esta cuenta no está autorizada como administradora.");
      return;
    }

    setUser(data.user);
    setIsAdmin(true);
    try {
      const [savedDrinks, imported] = await Promise.all([
        getCustomDrinks(),
        hasImportedMenuCatalog(),
      ]);
      setCustomDrinks(savedDrinks);
      setCatalogImported(imported);
    } catch (loadError) {
      setError(loadError.message || "No se pudieron cargar las bebidas guardadas.");
    }
    setLoginPassword("");
    setAuthLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    setCustomDrinks([]);
    setMessage("");
  }

  async function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setMessage("");
    if (!file.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen válido.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("La foto debe pesar menos de 10 MB.");
      return;
    }

    try {
      setPhoto(await compressPhoto(file));
    } catch (photoError) {
      setError(photoError.message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!photo) {
      setError("Agrega una foto para guardar la bebida.");
      return;
    }

    const formDrink = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      type: editingDrink?.type || "Bebida nueva",
      image: photo,
      alt: `${name.trim()} de Rush Concordia`,
    };

    try {
      if (editingDrink) {
        const updatedDrink = await updateCustomDrink(editingDrink.id, formDrink);
        setCustomDrinks((currentDrinks) =>
          currentDrinks.map((drink) => (drink.id === updatedDrink.id ? updatedDrink : drink)),
        );
        setMessage(`${updatedDrink.name} se actualizó.`);
      } else {
        const savedDrink = await saveCustomDrink({
          ...formDrink,
          id: `custom-${Date.now()}`,
        });
        setCustomDrinks((currentDrinks) => [...currentDrinks, savedDrink]);
        setMessage(`${formDrink.name} se agregó al menú.`);
      }

      setEditingDrink(null);
      setName("");
      setDescription("");
      setPrice("");
      setPhoto("");
      if (fileInput.current) fileInput.current.value = "";
    } catch (saveError) {
      setError(saveError.message || "No se pudo guardar la bebida.");
    }
  }

  function handleEdit(drink) {
    setEditingDrink(drink);
    setName(drink.name);
    setDescription(drink.description);
    setPrice(String(drink.price));
    setPhoto(drink.image);
    setError("");
    setMessage("");
    if (fileInput.current) fileInput.current.value = "";
    document.querySelector(".admin-page")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingDrink(null);
    setName("");
    setDescription("");
    setPrice("");
    setPhoto("");
    setError("");
    setMessage("");
    if (fileInput.current) fileInput.current.value = "";
  }

  async function handleDelete(id) {
    setError("");
    setMessage("");
    try {
      await deleteCustomDrink(id);
      setCustomDrinks((currentDrinks) => currentDrinks.filter((drink) => drink.id !== id));
      if (customDrinks.length <= 11) setShowAdditionalDrinks(false);
      if (editingDrink?.id === id) handleCancelEdit();
    } catch (deleteError) {
      setError(deleteError.message || "No se pudo eliminar la bebida.");
      try {
        setCustomDrinks(await getCustomDrinks());
      } catch {
        setError("La bebida pudo eliminarse, pero no se pudo actualizar la lista.");
      }
    }
  }

  async function handleImportCatalog() {
    setCatalogError("");
    setCatalogMessage("");
    setIsImportingCatalog(true);

    try {
      const result = await importMenuCatalog();
      const savedDrinks = await getCustomDrinks();
      setCustomDrinks(savedDrinks);
      setCatalogImported(true);
      setCatalogMessage(
        result.alreadyImported
          ? "El catálogo inicial ya había sido importado."
          : `Se importaron ${result.importedCount} bebidas al menú.`,
      );
    } catch (importError) {
      setCatalogError(importError.message || "No se pudo importar el catálogo.");
      try {
        setCustomDrinks(await getCustomDrinks());
      } catch {
        setCatalogError("No se pudo importar el catálogo ni actualizar la lista.");
      }
    } finally {
      setIsImportingCatalog(false);
    }
  }

  function renderDrinkRows(drinksToRender) {
    return drinksToRender.map((drink) => (
      <li className="admin-drink-row" key={drink.id}>
        <img src={drink.image} alt="" />
        <div>
          <h3>{drink.name}</h3>
          <p>{formatPrice(drink.price)}</p>
        </div>
        <div className="admin-drink-actions">
          <button className="admin-edit-drink" type="button" onClick={() => handleEdit(drink)}>
            Editar
          </button>
          <button className="admin-delete-drink" type="button" onClick={() => handleDelete(drink.id)}>
            Eliminar
          </button>
        </div>
      </li>
    ));
  }

  const visibleDrinks = customDrinks.slice(0, 10);
  const additionalDrinks = customDrinks.slice(10);

  if (!supabase || authLoading || !isAdmin) {
    return (
      <>
        <Header isMenu />
        <main className="admin-page">
          <div className="admin-auth">
            {!supabase ? (
              <>
                <p className="eyebrow">Rush Concordia · Administración</p>
                <h1>Configuración necesaria</h1>
                <p>Conecta el proyecto gratuito de Supabase para habilitar el acceso seguro al panel.</p>
                <a className="btn btn-gold" href={import.meta.env.BASE_URL}>Volver al inicio</a>
              </>
            ) : authLoading ? (
              <p role="status">Verificando acceso…</p>
            ) : (
              <>
                <p className="eyebrow">Rush Concordia · Administración</p>
                <h1>Acceso de administración</h1>
                <p>Inicia sesión con la cuenta autorizada.</p>
                <form className="admin-form" onSubmit={handleLogin}>
                  <label>
                    Correo
                    <input
                      autoComplete="username"
                      onChange={(event) => setLoginEmail(event.target.value)}
                      required
                      type="email"
                      value={loginEmail}
                    />
                  </label>
                  <label>
                    Contraseña
                    <input
                      autoComplete="current-password"
                      onChange={(event) => setLoginPassword(event.target.value)}
                      required
                      type="password"
                      value={loginPassword}
                    />
                  </label>
                  {error && <p className="admin-feedback is-error" role="alert">{error}</p>}
                  <button className="btn btn-gold admin-submit" type="submit">Iniciar sesión</button>
                </form>
              </>
            )}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header isMenu />
      <main className="admin-page">
        <div className="admin-shell">
          <div className="admin-heading">
            <p className="eyebrow">Rush Concordia · Administración</p>
            <h1>{editingDrink ? "Editar bebida" : "Agregar bebida"}</h1>
            <p>Sesión iniciada como {user.email}</p>
            <button className="admin-logout" onClick={handleLogout} type="button">Cerrar sesión</button>
          </div>

          <div className="admin-layout">
            <form className="admin-form" onSubmit={handleSubmit}>
              <label className="admin-photo-label">
                <span>Foto de la bebida</span>
                {photo ? (
                  <img className="admin-photo-preview" src={photo} alt="Vista previa de la bebida" />
                ) : (
                  <span className="admin-photo-empty">Selecciona una foto para ver la vista previa</span>
                )}
                <span className="admin-file-action">Subir foto</span>
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  required={!photo}
                />
              </label>

              <label>
                Nombre
                <input
                  autoComplete="off"
                  maxLength={70}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ej. Latte de vainilla"
                  required
                  value={name}
                />
              </label>

              <label>
                Descripción
                <textarea
                  maxLength={240}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe ingredientes y sabor"
                  required
                  rows={4}
                  value={description}
                />
              </label>

              <label>
                Precio (MXN)
                <input
                  inputMode="decimal"
                  min="1"
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="89"
                  required
                  step="1"
                  type="number"
                  value={price}
                />
              </label>

              {error && <p className="admin-feedback is-error" role="alert">{error}</p>}
              {message && <p className="admin-feedback" role="status">{message}</p>}

              <div className="admin-form-actions">
                <button className="btn btn-gold admin-submit" type="submit">
                  {editingDrink ? "Guardar cambios" : "Agregar al menú"}
                </button>
                {editingDrink && (
                  <button className="admin-cancel-edit" onClick={handleCancelEdit} type="button">
                    Cancelar edición
                  </button>
                )}
              </div>
              <p className="admin-storage-note">
                Los cambios se guardan en la base de datos compartida y aparecen en el menú de todos.
              </p>
            </form>

            <section className="admin-list" aria-labelledby="admin-list-title">
              <div className="admin-list-heading">
                <h2 id="admin-list-title">Bebidas agregadas</h2>
                <span>{customDrinks.length}</span>
              </div>
              {catalogError && <p className="admin-feedback is-error" role="alert">{catalogError}</p>}
              {catalogMessage && <p className="admin-feedback" role="status">{catalogMessage}</p>}
              {!catalogImported ? (
                <div className="admin-catalog-import">
                  <p>Guarda en Supabase todas las bebidas que ya aparecen en el menú.</p>
                  <button
                    className="btn btn-outline"
                    disabled={isImportingCatalog}
                    onClick={handleImportCatalog}
                    type="button"
                  >
                    {isImportingCatalog ? "Importando…" : "Importar catálogo inicial"}
                  </button>
                </div>
              ) : (
                <p className="admin-storage-note">
                  Catálogo inicial importado. Si eliminas bebidas, no se volverán a agregar automáticamente.
                </p>
              )}
              {customDrinks.length ? (
                <>
                  <ul>{renderDrinkRows(visibleDrinks)}</ul>
                  {additionalDrinks.length > 0 && (
                    <div className="admin-more-drinks-container">
                      <button
                        aria-controls="admin-additional-drinks"
                        aria-expanded={showAdditionalDrinks}
                        className="admin-more-drinks"
                        onClick={() => setShowAdditionalDrinks((isOpen) => !isOpen)}
                        type="button"
                      >
                        {showAdditionalDrinks
                          ? "Ver menos"
                          : `Ver ${additionalDrinks.length} bebidas más`}
                      </button>
                      {showAdditionalDrinks && (
                        <div
                          aria-label="Bebidas adicionales"
                          className="admin-additional-drinks"
                          id="admin-additional-drinks"
                          role="region"
                        >
                          <ul>{renderDrinkRows(additionalDrinks)}</ul>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <p className="admin-empty-list">Aún no hay bebidas guardadas en la base de datos.</p>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
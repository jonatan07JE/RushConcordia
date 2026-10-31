import { useEffect, useState } from "react";
import drinks from "./drinks.js";
import supabase from "./supabaseClient.js";

const updateEvent = "rush-concordia-drinks-updated";

function fromDatabaseRow(row) {
  return {
    id: row.id,
    catalogId: row.catalog_id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    type: row.type,
    image: row.image_url,
    alt: `${row.name} de Rush Concordia`,
    imagePath: row.image_path,
  };
}

export async function getCustomDrinks() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("custom_drinks")
    .select("id, catalog_id, name, description, price, type, image_url, image_path")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data.map(fromDatabaseRow);
}

export async function hasImportedMenuCatalog() {
  if (!supabase) throw new Error("Falta configurar Supabase.");

  const { data, error } = await supabase
    .from("menu_catalog_imports")
    .select("id")
    .eq("id", "initial-menu-v1")
    .maybeSingle();

  if (error) throw error;
  return Boolean(data);
}

export async function importMenuCatalog() {
  if (!supabase) throw new Error("Falta configurar Supabase.");

  if (await hasImportedMenuCatalog()) {
    return { alreadyImported: true, importedCount: 0 };
  }

  const { data: existingRows, error: readError } = await supabase
    .from("custom_drinks")
    .select("catalog_id")
    .not("catalog_id", "is", null);

  if (readError) throw readError;

  const existingIds = new Set(existingRows.map((row) => row.catalog_id));
  const catalogDrinks = drinks.filter((drink) => !existingIds.has(drink.id));
  const uploadedPaths = [];
  const rows = [];

  try {
    for (const drink of catalogDrinks) {
      let imageUrl = drink.image;
      let imagePath = null;

      if (!drink.image.startsWith("data:") && !/^https?:\/\//i.test(drink.image)) {
        const response = await fetch(new URL(drink.image, window.location.origin));
        if (!response.ok) throw new Error(`No se pudo cargar la foto de ${drink.name}.`);

        const imageBlob = await response.blob();
        imagePath = `catalog/${drink.id}-${crypto.randomUUID()}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from("drink-photos")
          .upload(imagePath, imageBlob, {
            contentType: imageBlob.type || "image/jpeg",
            upsert: false,
          });

        if (uploadError) throw uploadError;
        uploadedPaths.push(imagePath);
        imageUrl = supabase.storage.from("drink-photos").getPublicUrl(imagePath).data.publicUrl;
      }

      rows.push({
        catalog_id: drink.id,
        name: drink.name,
        description: drink.description,
        price: drink.price,
        type: drink.type,
        image_url: imageUrl,
        image_path: imagePath,
      });
    }

    if (rows.length) {
      const { error: insertError } = await supabase.from("custom_drinks").insert(rows);
      if (insertError) throw insertError;
    }
  } catch (error) {
    if (uploadedPaths.length) {
      const { error: cleanupError } = await supabase.storage
        .from("drink-photos")
        .remove(uploadedPaths);
      if (cleanupError) {
        throw new Error(`${error.message} No se pudieron limpiar algunas fotos: ${cleanupError.message}`);
      }
    }
    throw error;
  }

  const { error: markerError } = await supabase
    .from("menu_catalog_imports")
    .insert({ id: "initial-menu-v1" });

  if (markerError) throw markerError;
  window.dispatchEvent(new Event(updateEvent));
  return { alreadyImported: false, importedCount: rows.length };
}

export async function saveCustomDrink(drink) {
  if (!supabase) throw new Error("Falta configurar Supabase.");

  const imageBlob = await fetch(drink.image).then((response) => response.blob());
  const imagePath = `${crypto.randomUUID()}.jpg`;
  const { error: uploadError } = await supabase.storage
    .from("drink-photos")
    .upload(imagePath, imageBlob, { contentType: "image/jpeg", upsert: false });

  if (uploadError) throw uploadError;

  const imageUrl = supabase.storage.from("drink-photos").getPublicUrl(imagePath).data.publicUrl;
  const { data, error } = await supabase
    .from("custom_drinks")
    .insert({
      name: drink.name,
      description: drink.description,
      price: drink.price,
      type: drink.type,
      image_url: imageUrl,
      image_path: imagePath,
    })
    .select("id, name, description, price, type, image_url, image_path")
    .single();

  if (error) {
    await supabase.storage.from("drink-photos").remove([imagePath]);
    throw error;
  }

  window.dispatchEvent(new Event(updateEvent));
  return fromDatabaseRow(data);
}

export async function updateCustomDrink(id, drink) {
  if (!supabase) throw new Error("Falta configurar Supabase.");

  const { data: currentDrink, error: readError } = await supabase
    .from("custom_drinks")
    .select("image_path")
    .eq("id", id)
    .single();

  if (readError) throw readError;

  const updates = {
    name: drink.name,
    description: drink.description,
    price: drink.price,
    type: drink.type,
  };
  let uploadedPath = null;

  if (drink.image.startsWith("data:")) {
    const imageResponse = await fetch(drink.image);
    if (!imageResponse.ok) throw new Error("No se pudo procesar la nueva foto.");

    const imageBlob = await imageResponse.blob();
    uploadedPath = `${crypto.randomUUID()}.jpg`;
    const { error: uploadError } = await supabase.storage
      .from("drink-photos")
      .upload(uploadedPath, imageBlob, { contentType: "image/jpeg", upsert: false });

    if (uploadError) throw uploadError;

    updates.image_path = uploadedPath;
    updates.image_url = supabase.storage.from("drink-photos").getPublicUrl(uploadedPath).data.publicUrl;
  }

  const { data, error } = await supabase
    .from("custom_drinks")
    .update(updates)
    .eq("id", id)
    .select("id, catalog_id, name, description, price, type, image_url, image_path")
    .single();

  if (error) {
    if (uploadedPath) {
      const { error: cleanupError } = await supabase.storage
        .from("drink-photos")
        .remove([uploadedPath]);
      if (cleanupError) {
        throw new Error(`${error.message} No se pudo limpiar la nueva foto: ${cleanupError.message}`);
      }
    }
    throw error;
  }

  if (uploadedPath && currentDrink.image_path) {
    const { error: cleanupError } = await supabase.storage
      .from("drink-photos")
      .remove([currentDrink.image_path]);
    if (cleanupError) {
      window.dispatchEvent(new Event(updateEvent));
      throw new Error(`La bebida se actualizó, pero no se pudo eliminar la foto anterior: ${cleanupError.message}`);
    }
  }

  window.dispatchEvent(new Event(updateEvent));
  return fromDatabaseRow(data);
}

export async function deleteCustomDrink(id) {
  if (!supabase) throw new Error("Falta configurar Supabase.");

  const { data: drink, error: readError } = await supabase
    .from("custom_drinks")
    .select("image_path")
    .eq("id", id)
    .single();

  if (readError) throw readError;

  const { error: deleteError } = await supabase
    .from("custom_drinks")
    .delete()
    .eq("id", id);

  if (deleteError) throw deleteError;
  if (drink.image_path) {
    const { error: storageError } = await supabase.storage
      .from("drink-photos")
      .remove([drink.image_path]);
    if (storageError) throw storageError;
  }
  window.dispatchEvent(new Event(updateEvent));
}

export function useDrinks() {
  const [allDrinks, setAllDrinks] = useState(supabase ? [] : drinks);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const refreshDrinks = async () => {
      if (!supabase) {
        setAllDrinks(drinks);
        return;
      }

      try {
        const customDrinks = await getCustomDrinks();
        if (active) {
          setAllDrinks(customDrinks);
          setError("");
        }
      } catch (loadError) {
        if (active) {
          setAllDrinks([]);
          setError(loadError.message || "No se pudieron cargar las bebidas guardadas.");
        }
      }
    };

    refreshDrinks();
    window.addEventListener(updateEvent, refreshDrinks);

    return () => {
      active = false;
      window.removeEventListener(updateEvent, refreshDrinks);
    };
  }, []);

  return { drinks: allDrinks, error };
}
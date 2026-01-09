import client from "./supabaseClient";

export async function getPosts() {
    return client.from("posts").select("*");
}
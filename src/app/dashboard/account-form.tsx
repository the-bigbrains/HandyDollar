"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "../../types/supabase";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { supabaseClient } from "@/lib/supabaseClient";

export default function AccountForm() {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    const test = async () => {
      const resposnse = await supabaseClient.auth.getSession();
      if (!resposnse.data.session) return;
      setSession(resposnse.data.session);
    };
    test();
  }, []);

  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      if (!user) return;

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user.id as string)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);
      if (!user) return;

      let { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center fixed mt-10 bg-white px-2 py-4 rounded-lg gap-5 text-center text-black">
      <div></div>
      <div>
        <label htmlFor="email">Email: </label>
        <input id="email" type="text" value={session?.user.email} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name: </label>
        <input
          id="fullName"
          type="text"
          className="bg-black bg-opacity-10 p-1 rounded-lg"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          className="bg-black bg-opacity-10 p-1 rounded-lg"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website: </label>
        <input
          id="website"
          type="url"
          className="bg-black bg-opacity-10 p-1 rounded-lg"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="text-black hover:text-purple-300 hover:border-purple-300 border-black border-2 rounded-lg p-2 mx-2 duration-20"
          onClick={() =>
            updateProfile({ fullname, username, website, avatar_url })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button
            className="button block text-black hover:text-purple-300 hover:border-purple-300 border-black border-2 rounded-lg p-2 mx-2 duration-20"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}

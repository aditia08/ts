const SUPABASE_URL = "https://zzjhdbouoocqbxkwjrum.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6amhkYm91b29jcWJ4a3dqcnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5OTY5ODksImV4cCI6MjA5NTU3Mjk4OX0.Q1MPQNTgyGMVJ3lJRQfWyxl14Slha5dkCi_lTj69ByQ";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function saveData() {
    const tag = document.getElementById("tag").value;
    const value = parseFloat(document.getElementById("value").value);

    const { error } = await client
        .from("sensor_data")
        .insert([{ tag: tag, value: value }]);

    if (error) {
        alert(error.message);
        return;
    }

    alert("Saved");
    loadData();
}

async function loadData() {
    const { data, error } = await client
        .from("sensor_data")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        console.log(error);
        return;
    }

    let html = "";
    data.forEach(row => {
        html += `
            <tr>
                <td>${row.id}</td>
                <td>${row.tag}</td>
                <td>${row.value}</td>
                <td>${row.created_at}</td>
            </tr>
        `;
    });

    document.getElementById("tbody").innerHTML = html;
}

// Muat data saat halaman selesai dimuat
loadData();
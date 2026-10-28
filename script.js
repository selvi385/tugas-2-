const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m&timezone=Asia%2FJakarta";

async function loadWeather() {
  const status = document.getElementById("status");
  const table = document.getElementById("weather-data");

  status.textContent = "Sedang mengambil data cuaca...";
  table.innerHTML = "";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Gagal mengambil data API");
    }

    const data = await response.json();
    const times = data.hourly.time;
    const temperatures = data.hourly.temperature_2m;
    times.forEach((time, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${time.replace("T", " ")}</td>
                <td>${
                  temperatures[index] == null
                    ? "Tidak tersedia"
                    : temperatures[index] + " °C"
                }</td>
            `;

      table.appendChild(row);
    });

    status.textContent =
      "Data cuaca berhasil dimuat: " + times.length + " jam.";
  } catch (error) {
    status.textContent = "Gagal memuat data. Periksa koneksi internet.";
    console.error(error);
  }
}

loadWeather();

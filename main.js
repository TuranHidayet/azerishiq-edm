var map = L.map("map").setView([40.4093, 49.8671], 12); // Bakı koordinatları

// Xəritə stilini əlavə et
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// EDM məlumatları
var edms = [
  {
    id: "00000001",
    model: "CXE-D120",
    address: "İçərişəhər Y/S, Səbail rayonu",
    coords: [40.3661, 49.8351],
    status: "istifadəyə hazır",
    usage: 1,
  },
  {
    id: "00000002",
    model: "CXE-D120",
    address: "İçərişəhər Y/S, Səbail rayonu",
    coords: [40.3672, 49.8375],
    status: "istifadədədir",
    usage: 1,
  },
  {
    id: "00000003",
    model: "SC30750HGO",
    address: "Azərişıq Tədris Mərkəzi, Nərimanov rayonu",
    coords: [40.4003, 49.8751],
    status: "istifadəyə hazır",
    usage: 3,
  },
  {
    id: "00000004",
    model: "SC30750HGO",
    address: "Ağ şəhər-1 YS, Xətai rayonu",
    coords: [40.3907, 49.8956],
    status: "quraşdırılır",
    usage: 0,
  },
  {
    id: "00000005",
    model: "SC30750HGO",
    address: "Ağ şəhər-1 YS, Xətai rayonu",
    coords: [40.3918, 49.8959],
    status: "quraşdırılır",
    usage: 0,
  },
];

// Cədvələ məlumatları əlavə et və xəritəyə marker qoy
var tableBody = document.getElementById("edm-table-body");

edms.forEach((edm) => {
  // Cədvələ əlavə et
  var row = `<tr>
        <td>${edm.id}</td>
        <td>${edm.model}</td>
        <td>${edm.address}</td>
        <td>${edm.coords.join(", ")}</td>
        <td>${edm.status}</td>
        <td>${edm.usage}</td>
    </tr>`;
  tableBody.innerHTML += row;

  // Xəritəyə marker əlavə et
  L.marker(edm.coords)
    .addTo(map)
    .bindPopup(
      `<b>${edm.model}</b><br>${edm.address}<br><b>Status:</b> ${edm.status}`
    );
});

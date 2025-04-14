sirasi
adi -> name
address -> address
connector sayi > connectors->count
"accessDescription": "Sərbəst",
button(detalli melumat ucun)

button uzerine basdiqda dialog acilsin icninde connector olan obyektlerin icindeki melumatlar acilsin
dialogun icindeki melumatlar:

menteqe adi -> name
address -> address

connector 1
    gucu ("power": 120,)
    tarif ("price": 0.26,)
connector ....
    gucu ("power": 120,)
    tarif ("price": 0.26,)






{
    "id": 1,
    "name": "Atatürk Parkı",
    "address": "Atatürk prospekti 5, Bakı, Nərimanov",
    "accessDescription": "Sərbəst",
    "connectors": [
        {
            "id": 1,
            "state": 1,
            "latitude": 40.4012,
            "longitude": 49.85071,
            "sticker": 1,
            "outlets": [
                4
            ],
            "power": 120,
            "price": 0.26,
            "tariffs": [
                {
                    "id": 3,
                    "name": "PER_KWA_DC",
                    "withPreAuthorization": true,
                    "preAuthorizationAmount": 10,
                    "kwhPrice": 0.26,
                    "isBookable": false
                }
            ]
        },
        {
            "id": 2,
            "state": 1,
            "latitude": 40.4012,
            "longitude": 49.85074,
            "sticker": 1,
            "outlets": [
                7
            ],
            "power": 120,
            "price": 0.26,
            "tariffs": [
                {
                    "id": 3,
                    "name": "PER_KWA_DC",
                    "withPreAuthorization": true,
                    "preAuthorizationAmount": 10,
                    "kwhPrice": 0.26,
                    "isBookable": false
                }
            ]
        }
    ]
},


<tbody>
    <tr>
        <td>00000001</td>
        <td>CXE-D120</td>
        <td> İçərişəhər Y/S <br>
        <span class="district">Səbail rayonu</span>
        </td>
        <td>4486070.48 + 400974.81</td>
        <td><span class="badge bg-success w-100">istifadəyə hazır</span></td>
        <td class="status-cell" onclick="handleClick(this)">1
            <img class="icon-loc" src="./images/iconlocation.png" alt="">
        </td>
    </tr>
    <tr>
        <td>00000002</td>
        <td>CXE-D120</td>
        <td>İçərişəhər Y/S <br>
        <span class="district">Səbail rayonu</span>
        </td>
        <td>4486070.83 + 400977.84</td>
        <td><span class="badge bg-danger w-100">istifadədədir</span></td>
        <td class="status-cell" onclick="handleClick(this)">1
            <img class="icon-loc" src="./images/iconlocation.png" alt="">
        </td>
    </tr>
    <tr>
        <td>00000003</td>
        <td>SC30750HGO</td>
        <td> Azərişıq Tədris Mərkəzi <br>
        <span class="district">Nərimanov rayonu</span>
        </td>
        <td>4472653.38 + 402286.09</td>
        <td><span class="badge bg-success w-100 ">istifadəyə hazır</span></td>
        <td class="status-cell" onclick="handleClick(this)">3
            <img class="icon-loc" src="./images/iconlocation.png" alt="">
        </td>
    </tr>
    <tr>
        <td>00000004</td>
        <td>SC30750HGO</td>
        <td> Ağ şəhər-1 YS <br>
        <span class="district">Xətai rayonu</span>
        </td>
        <td>4470287.91 + 405938.33</td>
        <td><span class="badge bg-warning w-100 text-dark">quraşdırılır</span></td>
        <td class="status-cell" onclick="handleClick(this)">0
            <img  class="icon-loc" src="./images/iconlocation.png" alt="">
        </td>
    </tr>
    <tr>
        <td>00000005</td>
        <td>SC30750HGO</td>
        <td> Ağ şəhər-1 YS <br>
        <span class="district">Xətai rayonu</span>
        </td>
        <td>4470298.02 +405938.68</td>
        <td><span class="badge bg-warning w-100 text-dark">quraşdırılır</span></td>
        <td class="status-cell" onclick="handleClick(this)">0
            <img class="icon-loc" src="./images/iconlocation.png" alt="">
        </td>
    </tr>
    <tr>
        <td>00000005</td>
        <td>SC30750HGO</td>
        <td> Ağ şəhər-1 YS <br>
        <span class="district">Xətai rayonu</span>
        </td>
        <td>4470298.02 +405938.68</td>
        <td><span class="badge bg-warning w-100 text-dark">quraşdırılır</span></td>
        <td class="status-cell" onclick="handleClick(this)">0
            <img class="icon-loc" src="./images/iconlocation.png" alt="">
        </td>
    </tr>
    <tr>
    <td>00000005</td>
    <td>SC30750HGO</td>
    <td> Ağ şəhər-1 YS <br>
    <span class="district">Xətai rayonu</span>
    </td>
    <td>4470298.02 +405938.68</td>
    <td><span class="badge bg-warning w-100 text-dark">quraşdırılır</span></td>
    <td class="status-cell" onclick="handleClick(this)">0
        <img class="icon-loc" src="./images/iconlocation.png" alt="">
    </td>
</tr>
<tr>
    <td>00000005</td>
    <td>SC30750HGO</td>
    <td> Ağ şəhər-1 YS <br>
    <span class="district">Xətai rayonu</span>
    </td>
    <td>4470298.02 +405938.68</td>
    <td><span class="badge bg-warning w-100 text-dark">quraşdırılır</span></td>
    <td class="status-cell" onclick="handleClick(this)">0
        <img class="icon-loc" src="./images/iconlocation.png" alt="">
    </td>
</tr>
<tr>
<td>00000005</td>
<td>SC30750HGO</td>
<td> Ağ şəhər-1 YS <br>
<span class="district">Xətai rayonu</span>
</td>
<td>4470298.02 +405938.68</td>
<td><span class="badge bg-warning w-100 text-dark">quraşdırılır</span></td>
<td class="status-cell" onclick="handleClick(this)">0
    <img class="icon-loc" src="./images/iconlocation.png" alt="">
</td>
</tr>
</tbody>
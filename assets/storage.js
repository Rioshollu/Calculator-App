// Mengakses dan menyimpan data
const CACHE_KEY = "calculation_history";

function checkForStorage() {
    return typeof(storage) !== "undifined"
}

function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            // JSON.parse String ke JS
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }
        // Menambahkan nilai baru pada array
        historyData.unshift(data);

        if (historyData.length > 5) {
            // Pop menghapus nilai index terakhir pada array
            historyData.pop();
        }
        // JSON.String JS ke String
        // localStorage hanya bisa menyimpan data string
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

[
    {
        "firstNumber": "23",
        "seconfNumber": "15",
        "operator": "-",
        "result": 8
    },
    {
        "fistNumber": "26",
        "secondNumber": "6",
        "operator": "-",
        "result": 17
    }
]

// mengambalikan nilai array
function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
 }

//  merender data riwayat kalkulasi pada HTML ke fungsi renderHistory()
function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");
  
  
    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";
  
  
    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";
  
  
        historyList.appendChild(row);
    }
 }

//  Panggil fungsi renderHistory(); agar data history muncul ketika website pertama kali dijalankan
 renderHistory();

// Menyiapkan data untuk memanggil puthistory
const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result
}

// memanggil 
function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }
  
    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }
  
    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
 }
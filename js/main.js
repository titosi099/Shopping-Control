var list = [];

function getTotal(list) {
    var total = 0;
    for(var key in list) {
        total += list[key].value * list[key].amount;
    }
    document.getElementById('totalValue').innerHTML = formatValue(total);
}

function setListTable(list) {
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Options</td></tr></thead><tbody>';
    for(var key in list) {
        table += '<tr><td>'+formatDesc(list[key].desc)+'</td><td>'+formatAmount(list[key].amount)+'</td><td>'+formatValue(list[key].value)+'</td><td><buton class="btn btn-primary" onclick="setUpdate('+key+')">Edit</buton> <buton class="btn btn-danger" onclick="deleteData('+key+')">Delete</buton></td></tr>'
    }
    table += '</tbody>';
    document.getElementById('listTable').innerHTML = table;
    document.getElementById('errors').style.display = 'none';
    getTotal(list);
}

function formatDesc(desc) {
     var str = desc.toLowerCase();
     str = str.charAt(0).toUpperCase() + str.slice(1);
     return str;
}

function formatAmount(value) {
    var quant = parseInt(value);
    return quant;
}

function formatValue(value) {
    var vlr = parseFloat(value).toFixed(2) + '';
    vlr = vlr.replace('.', ',');
    vlr = '$ ' + vlr;
    return vlr;
};

function addData() {
    if(validateData()){
        return
    }
    var desc = document.getElementById('desc').value;
    var amount = document.getElementById('amount').value;
    var value = document.getElementById('value').value;

    list.unshift({"desc":desc, "amount":amount, "value":value});
    setListTable(list);

    var desc = document.getElementById('desc').value = '';
    var amount = document.getElementById('amount').value = '';
    var value = document.getElementById('value').value = '';
    saveStorage(list);

}

function setUpdate(id) {
    var obj = list[id];
    document.getElementById('desc').value = obj.desc;
    document.getElementById('amount').value = obj.amount;
    document.getElementById('value').value = obj.value;

    document.getElementById('btnAdd').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'inline-block';
    document.getElementById('inputIDUpdate').innerHTML = '<input type="hidden" id="idUpdate" value="'+id+'">';
}

function resetForm() {
    var desc = document.getElementById('desc').value = '';
    var amount = document.getElementById('amount').value = '';
    var value = document.getElementById('value').value = '';

    document.getElementById('btnAdd').style.display = 'inline-block';
    document.getElementById('btnUpdate').style.display = 'none';
    document.getElementById('inputIDUpdate').innerHTML = '';
    document.getElementById('errors').style.display = 'none';
}

function updateData() {
    if(validateData()){
        return
    }
    var id = document.getElementById('idUpdate').value;
    var desc = document.getElementById('desc').value;
    var amount = document.getElementById('amount').value;
    var value = document.getElementById('value').value;

    list[id].desc = desc;
    list[id].amount = amount;
    list[id].value = value;
    setListTable(list);
    resetForm();
    saveStorage(list);
}

function deleteData(id) {
    if(confirm('Delete this item?')) {
        list.splice(id, 1);
        setListTable(list);
        saveStorage(list);
    }
}

function validateData() {
    var desc = document.getElementById('desc').value;
    var amount = document.getElementById('amount').value;
    var value = document.getElementById('value').value;
    var errors = '';
    if(desc === '') {
        errors += '<p>Enter a description</p>';
    }
    if(amount === '') {
        errors += '<p>Enter a quantity</p>';
    } else if(amount != parseInt(amount)) {
        errors += '<p>amount invalid</p>';
    }
    if(value === '') {
        errors += '<p>Enter a value</p>';
    } else if(value != parseFloat(value)) {
        errors += '<p>value invalid</p>';
    }

    if(errors != ''){
        document.getElementById('errors').style.display = 'block';
        document.getElementById('errors').style.backgroundColor = 'rgba(85, 85, 85, 0.3)';
        document.getElementById('errors').style.color = 'red';
        document.getElementById('errors').style.padding = '10px';
        document.getElementById('errors').style.margin = '10px';
        document.getElementById('errors').style.borderRadius = '13px';
        document.getElementById('errors').innerHTML = '<h1>Error:</h1>' + errors; 
        return true;
    } else {
        return false;
    }
}

function clearList() {
    if(confirm('Delete this list?')){
        list = [];
        setListTable(list);
        saveStorage(list);
    }
}

function saveStorage(list) {
    var jsonStr = JSON.stringify(list);
    localStorage.setItem('list', jsonStr);
}

function initialize() {
    var listLocalStorage = localStorage.getItem('list');
    if(listLocalStorage) {
        list = JSON.parse(listLocalStorage);
        setListTable(list);
    }
}

initialize();
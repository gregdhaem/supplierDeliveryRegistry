
const tableKey = 'sdr-table';

let sdrTable;

let sdrTableDemo = [
    {
        'date': '28/01/2019',
        'time': '11:32',
        'company': 'Sodexo',
        'service': 'Cuisine',
        'comment': 'Livraison matériel'
    },
    {
        'date': '29/01/2019',
        'time': '12:32',
        'company': 'UPS',
        'service': 'Gestion',
        'comment': 'Livraison'
    },
    {
        'date': '30/01/2019',
        'time': '15:32',
        'company': 'Koné',
        'service': 'Entretien',
        'comment': 'Dépannage ascenseur'
    }
];

let enableDisableDataInput = (option) => {
    let editEntryDate = document.getElementById('date');

    if (option === 'enable')
        editEntryDate.disabled = false;

    else if (option === 'disable')
        editEntryDate.disabled = true;

};



let refreshDOMTable = () => {

    let sdrTableKeys = Object.keys(sdrTable);
    let tableContainer = document.getElementById('sdrTableContainer')
    let oldTableBody = document.getElementById('tableBody');

    tableContainer.removeChild(oldTableBody);

    let newTableBody = document.createElement('span');
    newTableBody.id = 'tableBody';

    tableContainer.appendChild(newTableBody);

    for (let i = 0; i < sdrTableKeys.length; i++) {

        let currentRow = document.createElement('div');

        let currentDateCell = document.createElement('div');
        let currentTimeCell = document.createElement('div');
        let currentCompanyCell = document.createElement('div');
        let currentServiceCell = document.createElement('div');
        let currentCommentCell = document.createElement('div');

        let currentEditBtn = document.createElement('div');
        let currentDeleteBtn = document.createElement('div');


        currentRow.className = 'sdr-table-row';
        currentDateCell.className = 'sdr-table-column sdr-date';
        currentTimeCell.className = 'sdr-table-column sdr-time';
        currentCompanyCell.className = 'sdr-table-column sdr-company';
        currentServiceCell.className = 'sdr-table-column sdr-service';
        currentCommentCell.className = 'sdr-table-column sdr-comment';

        currentEditBtn.className = 'sdr-table-column sdr-edit';
        currentDeleteBtn.className = 'sdr-table-column sdr-delete';


        currentDateCell.innerHTML = sdrTable[i].date;
        currentTimeCell.innerHTML = sdrTable[i].time;
        currentCompanyCell.innerHTML = sdrTable[i].company;
        currentServiceCell.innerHTML = sdrTable[i].service;
        currentCommentCell.innerHTML = sdrTable[i].comment;

        currentEditBtn.innerHTML = '<i class="far fa-edit"></i>'
        currentDeleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>'


        currentRow.appendChild(currentDateCell);
        currentRow.appendChild(currentTimeCell);
        currentRow.appendChild(currentCompanyCell);
        currentRow.appendChild(currentServiceCell);
        currentRow.appendChild(currentCommentCell);

        currentRow.appendChild(currentEditBtn);
        currentRow.appendChild(currentDeleteBtn);


        newTableBody.appendChild(currentRow);
    }

    let enableDisableNewEntryModal = (option) => {

        let newEntryDate = document.getElementById('date');
        let newEntryTime = document.getElementById('time');
        let newEntryCompany = document.getElementById('company');
        let newEntryService = document.getElementById('service');
        let newEntryComment = document.getElementById('comment');

        newEntryDate.value = '';
        newEntryTime.value = '';
        newEntryCompany.value = '';
        newEntryService.value = '';
        newEntryComment.value = '';

        let newEntryModal = document.getElementById('newEntryModal');
        let backDrop = document.getElementById('backdrop');

        newEntryModal.className = `${option}-modal`;
        backDrop.className = `${option}-modal`;
    }

    let addNewEntryBtn = document.getElementById('addEntry');
    let editBtns = document.getElementsByClassName('sdr-edit');
    let deleteBtns = document.getElementsByClassName('sdr-delete');

    let newEntrySubmitBtn = document.getElementById('newEntrySubmitBtn');
    let newCancelSubmitBtn = document.getElementById('newEntryCancelBtn');

    newEntrySubmitBtn.addEventListener('click', () => {

        let sdrTableKeys = Object.keys(sdrTable);

        let newEntryDate = document.getElementById('date').value.trim();
        let newEntryTime = document.getElementById('time').value.trim();
        let newEntryCompany = document.getElementById('company').value.trim();
        let newEntryService = document.getElementById('service').value.trim();
        let newEntryComment = document.getElementById('comment').value.trim();

        if (newEntryDate === '')
            newEntryDate.className = 'input-err';
        else 
            newEntryDate.className = '';

        if (newEntryTime === '')
            newEntryTime.className = 'input-err';
        else 
            newEntryTime.className = '';

            if (newEntryCompany === '')
            newEntryCompany.className = 'input-err';
        else 
            newEntryCompany.className = '';

            if (newEntryService === '')
            newEntryService.className = 'input-err';
        else 
            newEntryService.className = '';

        if (newEntryDate !== '' && newEntryTime !== '' && newEntryCompany !== '' && newEntryService !== '') {
            let newEntryId = (sdrTableKeys.length);
            console.log(newEntryId);
            console.log(sdrTableKeys.length);
            sdrTable[newEntryId] = {
                'date' : newEntryDate,
                'time' : newEntryTime,
                'company' : newEntryCompany,
                'service' : newEntryService,
                'comment' : newEntryComment
            }
            localStorage.setItem(tableKey, JSON.stringify(sdrTable));
            enableDisableNewEntryModal('disable');
            refreshDOMTable();
        }

    });

    newEntryCancelBtn.addEventListener('click', () => {
        enableDisableNewEntryModal('disable');
    });

    addNewEntryBtn.addEventListener('click', () => {
        enableDisableNewEntryModal('enable');
    });

    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener('click', ($event) => {
            let dateToEdit = $event.target.parentElement.children[0].innerText;
            console.log(dateToEdit);
            let timeToEdit = $event.target.parentElement.children[1].innerText;
            console.log(timeToEdit);
            let companyToEdit = $event.target.parentElement.children[2].innerText;
            console.log(companyToEdit);
            let serviceToEdit = $event.target.parentElement.children[3].innerText;
            console.log(serviceToEdit);
            let commentToEdit = $event.target.parentElement.children[4].innerText;
            console.log(commentToEdit);
            console.log($event.target.parentElement)

            enableDisableNewEntryModal('enable');

            let editEntryDate = document.getElementById('date').placeholder;
            let editEntryTime = document.getElementById('time');
            let editEntryCompany = document.getElementById('company');
            let editEntryService = document.getElementById('service');
            let editEntryComment = document.getElementById('comment');

            editEntryDate.value = dateToEdit;
            editEntryTime.value = timeToEdit;
            editEntryCompany.value = companyToEdit;
            editEntryService.value = serviceToEdit;
            editEntryComment.value = commentToEdit;

            //enableDisableDataInput('disable');
        });
    };

    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', ($event) => {
            let entryTableToDelete = {};

            let dateToDelete = $event.target.parentElement.children[0].innerText;
            let timeToDelete = $event.target.parentElement.children[1].innerText;
            let companyToDelete = $event.target.parentElement.children[2].innerText;
            let serviceToDelete = $event.target.parentElement.children[3].innerText;
            let commentToDelete = $event.target.parentElement.children[4].innerText;

            entryTableToDelete = {
                'date' : dateToDelete,
                'time' : timeToDelete,
                'company' : companyToDelete,
                'service' : serviceToDelete,
                'comment' : commentToDelete
            }

            console.log(entryTableToDelete);

            let isSure = window.confirm("Etes vous sûr de vouloir effacer cette entrée ?");

            if (isSure) 
                deleteEntryFromTable(entryTableToDelete);
            
        })
    }
}

let deleteEntryFromTable = (entry) => {
    let tmpTable = {};
    let sdrTableKeys = Object.keys(sdrTable);

    for (let i = 0; i < sdrTableKeys.length; i++) {

        if(entry.date !== sdrTable[sdrTableKeys[i]].date 
            && entry.time !== sdrTable[sdrTableKeys[i]].time
            && entry.company !== sdrTable[sdrTableKeys[i]].company
            && entry.service !== sdrTable[sdrTableKeys[i]].service
            && entry.comment !== sdrTable[sdrTableKeys[i]].comment) {
                tmpTable[sdrTableKeys[i]] = sdrTable[sdrTableKeys[i]];
        }
    }
    sdrTable = tmpTable;
    console.log(tmpTable);
    localStorage.setItem(tableKey, JSON.stringify(sdrTable));
    refreshDOMTable();
}

let init = () => {

    if(localStorage.getItem(tableKey)) {
        sdrTable = JSON.parse(localStorage.getItem(tableKey));
    } else {
        sdrTable = sdrTableDemo;
        localStorage.setItem(tableKey, JSON.stringify(sdrTable));
    }
    console.log(sdrTable);
    console.log(sdrTable.length)
    console.log(sdrTable[0]);
    refreshDOMTable();
}

init();




function exportTableToExcel() {
    alert("Export du tableau d'entrées fournisseur vers Excel !");
}
  
  
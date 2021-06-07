function renderDebts(user, debts) {
    const debtsTable = document.getElementById("debts_body");
    debtsTable.innerHTML = "";
    for(var i = 0; i < debts.length; i++){
      const row = document.createElement("tr")
      const ID = document.createElement("td");
      ID.innerText = debts[i].id;
  
      const userCol = document.createElement('td')
      userCol.innerText = user.name;
  
      const quantity = document.createElement('td')
      quantity.innerText = debts[i].quantity;
  
      const balance = document.createElement('td')
      balance.innerText = debts[i].balance;
  
  
      const remainder = document.createElement('td')
      remainder.innerText = debts[i].quantity - debts[i].balance;
  
  
      const accepted = document.createElement('td')
      accepted.innerText = debts[i].accepted;
  
      const date = document.createElement('td')
      date.innerText = debts[i].date;
      row.appendChild(ID);
      row.appendChild(userCol);
      row.appendChild(quantity);
      row.appendChild(balance);
      row.appendChild(remainder);
      row.appendChild(accepted);
      row.appendChild(date);
      debtsTable.appendChild(row);
      
    }
  }
  
  function renderUsers(users, debts) {
    const usersTable = document.getElementById("users_body");
    usersTable.innerHTML = "";
    for (var i = 0; i < users.length; i++) {
      const row = document.createElement("tr");
  
      const ID = document.createElement("td");
      ID.innerText = users[i].id;
      const name = document.createElement("td");
      name.innerText = users[i].name;
      const serialNumber = document.createElement("td");
      serialNumber.innerText = users[i].serialNumber;
      const detailsBtn = document.createElement("button");
      detailsBtn.addEventListener("click", function onDetails(e) {
        const targetUser = users[e.target.dataset.userIndex];
        const userDebts = debts.filter(
          (debt) => debt.userId == e.target.dataset.userId
        );
  
        renderDebts(targetUser, userDebts);
      });
      detailsBtn.className = 'btn btn-info';
      detailsBtn.dataset.userId = users[i].id;
      detailsBtn.dataset.userIndex = i;
      detailsBtn.innerHTML = "Detailes";
      row.appendChild(ID);
      row.appendChild(name);
      row.appendChild(serialNumber);
      row.appendChild(detailsBtn);
      usersTable.appendChild(row);
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const debtUsers = [
      {
        id: 1,
        userId: 1,
        date: "2021-06-6",
        quantity: 20,
        balance: 15,
        accepted: false,
      },
      {
        id: 2,
        userId: 1,
        date: "2021-05-6",
        quantity: 20,
        balance: 20,
        accepted: true,
      },
    ];
    const users = [
      {
        id: 1,
        name: "Userjon",
        serialNumber: "AA89450293908",
      },
    ];
  
    const form = document.getElementById("save_user");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("username").value;
      const serialNumber = document.getElementById("serial").value;
      const user = {
        name,
        serialNumber,
      };
      const lastId = users[users.length - 1].id;
      user.id = lastId + 1;
      users.push(user);
      renderUsers(users, debtUsers);
    });
    renderUsers(users, debtUsers);
  });
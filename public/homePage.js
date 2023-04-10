const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.succes) {
           location.reload();
           return
        } else {
            throw "Выход не выполнен!"
        }
    })
}
ApiConnector.current(response => {
    if (response.succes) {
        ProfileWidget.showProfile(response.data)
    }
})

const ratesBoard = new RatesBoard();
ratesBoard.getRates = ApiConnector.getStocks (response => {
    if (response.succes) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data)
    }
}) 
function getStocks() {
    console.log('')
    ratesBoard.getRates = ApiConnector.getStocks (response => {
        if (response.succes) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data)
        }
    }) 
}
setInterval(getStocks, 60000)

const moneyManager = new MoneyManager ();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.succes) {
            ProfileWidget.showProfile(response.data);
            let message = "Баланс пополнен";
            moneyManager.setMessage(response.succes, message);
        } else {
            moneyManager.setMessage(response.succes, response.error);
        }
    })
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney (data, response => {
        if (response.succes) {
            ProfileWidget.showProfile(response.data);
            let message = "Конвертация выполнена";
            moneyManager.setMessage(response.succes, message);
        } else {
            moneyManager.setMessage(response.succes, response.error);
        }
    })
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney (data, response => {
        if (response.succes) {
            ProfileWidget.showProfile(response.data);
            let message = "Деньги переведены";
            moneyManager.setMessage(response.succes, message);
        } else {
            moneyManager.setMessage(response.succes, response.error);
        }
    })
}

const favoritesWidget = FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.succes) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUserList(response.data);
    }
})

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserFavorites(data, response => {
        if (response.succes) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUserList(response.data);
            let message = "Пользователь добавлен";
            favoritesWidget.setMessage(response.succes, message);
        } else {
            favoritesWidget.setMessage(response.succes, response.error);
        }
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.succes) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUserList(response.data);
            let message = "Пользователь удален";
            favoritesWidget.setMessage(response.succes, message);
        } else {
            favoritesWidget.setMessage(response.succes, response.error);
        }
    })
}
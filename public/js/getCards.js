"use strict";

// Set an event listener for each element. (selector, event, action)
window.onload = getCards();

let curentNumberActiveCard;
let activeStack;
let stack = {
    1: {},
    2: {},
    3: {}
};
let sizeOfStack_1, sizeOfStack_2, sizeOfStack_3;

let activeStackNumber;

// Request all cards from the table
function getCards() {

    let url = 'http://mycards.laravel/ajax/get-cards';
    
    // Получаем защитный токен Laravel из скрытого input
    let laravelToken = document.querySelector('input[name="_token"]').value;

    // Create POST request data
    let postData = new FormData();
    postData.append('_token', laravelToken);

    // Create a connection
    let request = new XMLHttpRequest();

    // Request setting
    request.open('POST', url);
    request.responseType = 'json';

    // Sending request
    request.send(postData);

    // If connection error
    request.onerror = function () {
        alert(`Ошибка соединения`);
    };
    // When the server response will be received
    request.onload = function () {

        // Analysis of HTTP response status
        if (request.status != 200) {
            // Print error status and error description
            alert(`Ошибка ${request.status}: ${request.statusText}`);

        } else { // if all OK

            // Writing the result to a variable
            let responseObj = request.response;

            let numStack;
            let idCard;

            for (let key in responseObj) {

                numStack = responseObj[key].stack;
                idCard = responseObj[key].id;

                stack[numStack][idCard] = responseObj[key];

            }

            sizeOfStack_1 = stack[1].length;
            sizeOfStack_2 = stack[2].length;
            sizeOfStack_3 = stack[3].length;

            console.log(stack);
//            console.log(responseObj);

        }
    };

}

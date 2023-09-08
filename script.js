document.addEventListener("DOMContentLoaded", function () {
  // Declaring and assigning variables
  const cardNumberInputs = document.querySelectorAll(".card-number");
  const cardHolder = document.querySelector(".card-holder");
  const cardExpirationMonth = document.querySelector("#expiration-month");
  const cardExpirationYear = document.querySelector("#expiration-year");
  const cardCVV = document.querySelector(".cvv");
  const cardNumberText = document.querySelector("#card-number-display");
  const cardHolderText = document.querySelector("#card-holder-name");
  const cardExpirationMonthText = document.querySelector("#month");
  const cardExpirationYearText = document.querySelector("#year");
  const cardCVVText = document.querySelector(".cvv-box");
  var visaLogo = document.getElementById("visa-logo");
  var mastercardLogo = document.getElementById("mastercard-logo");
  var amexLogo = document.getElementById("amex-logo");
  var form = document.querySelector("form");
  var validationMessage = document.querySelector("#validation-message");
  var submit = document.querySelector("button")

    // Output to the Card Display

  // Creating an array to take the card number

  cardNumberInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      const values = Array.from(cardNumberInputs).map((input) => input.value);
      cardNumberText.textContent = values.join(" ");

      // this moves the focus to the next input
      if (
        input.value.length >= input.maxLength &&
        index < cardNumberInputs.length - 1
      ) {
        cardNumberInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && input.value.length === 0) {
        if (index > 0) {
          cardNumberInputs[index - 1].focus();
        }
      }
    });
  });



  cardNumberInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      updateCardLogo(input.value);
    });
  });

// Function to effect logo change 

  function updateCardLogo(cardNumber) {
    // Removes all logo classes

    visaLogo.classList.remove("active");
    mastercardLogo.classList.remove("active");
    amexLogo.classList.remove("active");

    // Checks if the card number starts with specific digits

    if (cardNumber.startsWith("4")) {
      visaLogo.classList.add("active");
    } else if (cardNumber.startsWith("5")) {
      mastercardLogo.classList.add("active");
    } else if (cardNumber.startsWith("3")) {
      amexLogo.classList.add("active");
    }
  }

  // Displays user input on the card 

  cardHolder.oninput = () => {
    cardHolderText.innerText = cardHolder.value;
  };

  cardExpirationMonth.oninput = () => {
    cardExpirationMonthText.innerText = cardExpirationMonth.value;
  };

  cardExpirationYear.oninput = () => {
    cardExpirationYearText.innerText = cardExpirationYear.value;
  };

  // This effects the transforming of the card

  cardCVV.onmouseenter = () => {
    document.querySelector(".front").style.transform =
      "perspective(1000px) rotateY(-180deg)";
    document.querySelector(".back").style.transform =
      "perspective(1000px) rotateY(0deg)";
  };

  cardCVV.onmouseleave = () => {
    document.querySelector(".front").style.transform =
      "perspective(1000px) rotateY(0deg)";
    document.querySelector(".back").style.transform =
      "perspective(1000px) rotateY(180deg)";
  };

  cardCVV.oninput = () => {
    cardCVVText.innerText = cardCVV.value;
  };

  // Form validation

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset validation message

    validationMessage.textContent = "";

    // Validate card number (simple validation)

    var cardNumberInputs = document.querySelectorAll(".card-number");
    var cardNumber = "";
    cardNumberInputs.forEach(function (input) {
      cardNumber += input.value;
    });

    if (!isValidCardNumber(cardNumber)) {
      validationMessage.textContent = "Invalid card number";
      return;
    }

    var cardHolderName = cardHolderInput.value;

    if (!isValidCardHolderName(cardHolderName)) {
      validationMessage.textContent = "Invalid card holder name";
      return;
    }

    if (!isValidExpirationDate(cardExpirationMonth, cardExpirationYear)) {
      validationMessage.textContent = "Invalid expiration date";
      return;
    }

    // Validate CVV (simple validation)
    var cvv = cvvInput.value;

    if (!isValidCVV(cvv)) {
      validationMessage.textContent = "Invalid CVV";
      return;
    }

    // Form is valid, show success message
    alert("Your payment was successful.");
  });
});

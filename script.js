const subscribeForm = document.querySelector("#subscribe-form");
const emailInput = document.querySelector("#email");
const subscribeButton = document.querySelector("#subscribe-button");
const subscribeMessage = document.querySelector("#subscribe-message");

const showMessage = (message, type) => {
	subscribeMessage.textContent = message;
	subscribeMessage.className = `subscribe-message ${type}`;
};

const handleSubscribe = (event) => {
	event.preventDefault();

	const email = emailInput.value.trim();

	if (!email) {
		showMessage("이메일 주소를 입력해 주세요.", "error");
		emailInput.focus();
		return;
	}

	if (!emailInput.checkValidity()) {
		showMessage("올바른 이메일 주소를 입력해 주세요.", "error");
		emailInput.focus();
		return;
	}

	showMessage(
		"이메일 형식이 확인되었습니다! 실제 구독은 서버 연동 후 완료됩니다.",
		"success",
	);

	subscribeButton.textContent = "입력 확인 완료";
	subscribeButton.disabled = true;
	emailInput.readOnly = true;
};

const handleInput = () => {
	if (subscribeButton.disabled) {
		subscribeButton.disabled = false;
		subscribeButton.textContent = "업데이트 소식 받기";
		emailInput.readOnly = false;
	}

	subscribeMessage.textContent = "";
	subscribeMessage.className = "subscribe-message";
};

subscribeForm.addEventListener("submit", handleSubscribe);
emailInput.addEventListener("input", handleInput);

document.addEventListener("DOMContentLoaded", () => {
	// ==========================================
	// 1. 탭 UI 전환 기능 (Click 이벤트 / 요구사항 3)
	// ==========================================
	const tabButtons = document.querySelectorAll(".tab-button");
	const tabContents = document.querySelectorAll(".tab-content");
	const navLinks = document.querySelectorAll(".nav-link");

	function switchTab(targetTabId) {
		// 모든 탭 버튼 및 콘텐츠 상태 초기화
		tabButtons.forEach((btn) => {
			const isActive = btn.dataset.tab === targetTabId;
			btn.classList.toggle("active", isActive);
			btn.setAttribute("aria-selected", isActive);
		});

		tabContents.forEach((content) => {
			content.classList.toggle("active", content.id === targetTabId);
		});
	}

	// 탭 버튼 클릭 이벤트 (click)
	tabButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			const targetTab = e.target.dataset.tab;
			switchTab(targetTab);
		});
	});

	// 헤더 상단 네비게이션 클릭 시 해당 탭으로 바로 이동
	navLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			const targetTab = link.dataset.tab;
			switchTab(targetTab);
		});
	});

	// ==========================================
	// 2. 속성 필터링 기능 (Change 이벤트 / 요구사항 1)
	// ==========================================
	const elementSelect = document.getElementById("element-select");
	const characterCards = document.querySelectorAll(".character-card");

	elementSelect.addEventListener("change", (e) => {
		const selectedValue = e.target.value;

		characterCards.forEach((card) => {
			if (selectedValue === "all" || card.dataset.element === selectedValue) {
				card.style.display = "block";
			} else {
				card.style.display = "none";
			}
		});
	});

	// ==========================================
	// 3. 이메일 입력 실시간 검증 (Input 이벤트 & 상태/문구/스타일 변경 / 요구사항 1, 2)
	// ==========================================
	const emailInput = document.getElementById("email");
	const submitButton = document.getElementById("subscribe-button");
	const editEmailButton = document.getElementById("edit-email-button");
	const subscribeMessage = document.getElementById("subscribe-message");
	const subscribeForm = document.getElementById("subscribe-form");

	function validateEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	function resetEmailForm() {
		emailInput.readOnly = false;
		emailInput.className = "";
		submitButton.disabled = true;
		submitButton.textContent = "이메일을 입력해주세요";
		editEmailButton.hidden = true;
	}

	emailInput.addEventListener("input", (e) => {
		const value = e.target.value.trim();

		if (value === "") {
			emailInput.className = "";
			submitButton.disabled = true;
			submitButton.textContent = "이메일을 입력해주세요";
			subscribeMessage.textContent = "";
			subscribeMessage.className = "subscribe-message";
			return;
		}

		if (validateEmail(value)) {
			emailInput.className = "valid";
			submitButton.disabled = false;
			submitButton.textContent = "업데이트 소식 받기";
			subscribeMessage.textContent = "올바른 이메일 형식입니다.";
			subscribeMessage.className = "subscribe-message success";
			return;
		}

		emailInput.className = "invalid";
		submitButton.disabled = true;
		submitButton.textContent = "이메일 형식을 확인해주세요";
		subscribeMessage.textContent =
			"유효한 이메일 주소를 입력해 주세요. (예: user@example.com)";
		subscribeMessage.className = "subscribe-message error";
	});

	subscribeForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const email = emailInput.value.trim();

		if (!validateEmail(email)) {
			emailInput.dispatchEvent(new Event("input"));
			return;
		}

		alert("구독 신청이 완료되었습니다!");

		emailInput.value = email;
		emailInput.readOnly = true;
		emailInput.className = "valid";
		submitButton.disabled = true;
		submitButton.textContent = "구독 신청 완료";
		editEmailButton.hidden = false;

		subscribeMessage.textContent =
			"구독 신청이 완료되었습니다. 실제 구독 처리는 서버 연동 후 가능합니다.";
		subscribeMessage.className = "subscribe-message success";
	});

	editEmailButton.addEventListener("click", () => {
		resetEmailForm();

		subscribeMessage.textContent = "수정할 이메일 주소를 입력해주세요.";
		subscribeMessage.className = "subscribe-message";

		emailInput.focus();
	});
});

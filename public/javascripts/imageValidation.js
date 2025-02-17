document.getElementById("image").addEventListener("change", function (e) {
    const files = e.target.files;
    const maxFiles = 10; // 최대 10개 파일 제한
    const maxSize = 5 * 1024 * 1024; // 5MB per file
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    let errorMsg = "";

    // 파일 개수 검사
    if (files.length > maxFiles) {
        errorMsg += `You can only upload up to ${maxFiles} files. `;
    }

    // 각 파일에 대해 타입과 크기 검사
    for (let file of files) {
        if (!allowedTypes.includes(file.type)) {
            errorMsg += `${file.name} is not an allowed file type. `;
        }
        if (file.size > maxSize) {
            errorMsg += `${file.name} must be less than 5MB in size.`;
        }
    }

    // Integrate with HTML5 form validation
    if (errorMsg) {
        e.target.setCustomValidity(errorMsg);
    } else {
        e.target.setCustomValidity('');
    }
    // 피드백 영역 업데이트
    const feedbackContainer = document.getElementById("imageFeedback");
    if (errorMsg) {
        feedbackContainer.textContent = errorMsg;
        feedbackContainer.style.display = "block";
        // 부트스트랩 스타일 적용: 오류 상태 표시
        feedbackContainer.classList.remove("valid-feedback");
        feedbackContainer.classList.add("invalid-feedback");
    } else {
        feedbackContainer.textContent = "Looks good!";
        feedbackContainer.style.display = "block";
        feedbackContainer.classList.remove("invalid-feedback");
        feedbackContainer.classList.add("valid-feedback");
    }
});

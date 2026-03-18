/**
 * TechSupport Student-to-Student Project
 * JavaScript Core Logic for Modern UI
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Hiệu ứng Glassmorphism cho Navbar khi cuộn trang
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '10px 0'; // Thu nhỏ navbar một chút khi cuộn
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '0';
        }
    });

    // 2. Cuộn mượt (Smooth Scroll) cho các liên kết điều hướng
    document.querySelectorAll('.nav-links a,.btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Trừ đi chiều cao của navbar
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 3. Xử lý tra cứu trạng thái sửa chữa (Mô phỏng kết nối Google Sheets)
    const trackInput = document.querySelector('.tracking-input input');
    const trackBtn = document.querySelector('.tracking-input button');

    if (trackBtn) {
        trackBtn.addEventListener('click', async () => {
            const jobId = trackInput.value.trim().toUpperCase();

            if (!jobId) {
                alert("Vui lòng nhập mã vận đơn (Ví dụ: TS-001)");
                return;
            }

            // Hiệu ứng loading
            trackBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang kiểm tra...';
            trackBtn.disabled = true;

            // Mô phỏng hàm trích xuất dữ liệu (QUERY) từ hệ thống [1, 3]
            setTimeout(() => {
                // Giả lập một số mã có sẵn
                const mockData = {
                    'TS-001': 'Trạng thái: Đã hoàn thành - Vui lòng đến nhận máy.',
                    'TS-002': 'Trạng thái: Đang vệ sinh & thay keo tản nhiệt.',
                    'TS-003': 'Trạng thái: Đang chờ linh kiện (SSD) từ kho.'
                };

const result = mockData[jobId] || "Không tìm thấy mã này. Vui lòng liên hệ hỗ trợ viên qua Zalo.";
                alert(result);

                // Trả lại trạng thái nút
                trackBtn.innerHTML = 'Tra cứu ngay';
                trackBtn.disabled = false;
            }, 1500);
        });
    }

    // 4. Cảnh báo "Quy tắc sống còn" khi nhấn Đặt lịch [4]
    const bookingLinks = document.querySelectorAll('a[href="#booking"]');
    bookingLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log("%c TechSupport: Nhắc khách hàng sao lưu dữ liệu trước khi thực hiện!", "color: red; font-weight: bold; font-size: 1.2rem;");
        });
    });

    // 5. Hiệu ứng hiển thị thẻ dịch vụ khi cuộn (Animation on Scroll)
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
async function checkStatus() {
    const jobId = document.getElementById('jobID').value.trim();
    // URL này lấy từ Apps Script sau khi Deploy
    const webAppUrl = "https://script.google.com/macros/s/AKfycbxySQZnOAifuYjyj1QcBPNrXTguWMgygb0StiY1v_cQKUU7ViaR_CSkNfEzoZrOor2E/exec" + jobId;

    const response = await fetch(webAppUrl);
    const result = await response.json();
    
    if(result.status) {
        alert("Khách hàng: " + result.name + "\nTrạng thái: " + result.status);
    } else {
        alert("Mã vận đơn không chính xác!");
    }
}

/**
 * TechSupport Student-to-Student Project
 * Chỉnh sửa: Đồng bộ ID tra cứu và tối ưu hiệu ứng
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Hiệu ứng Glassmorphism cho Navbar khi cuộn
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                navbar.style.height = '70px'; // Thu nhỏ nhẹ navbar
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.8)';
                navbar.style.boxShadow = 'none';
                navbar.style.height = '80px';
            }
        });
    }

    // 2. Cuộn mượt (Smooth Scroll) cho các link điều hướng
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Xử lý tra cứu trạng thái
    // Lưu ý: Trong HTML của bạn ID là "trackID"
    const trackInput = document.getElementById('trackID');
    const trackBtn = document.querySelector('.tracking-input button');

    async function handleSearch() {
        const jobId = trackInput.value.trim().toUpperCase();

        if (!jobId) {
            alert("Vui lòng nhập mã vận đơn (Ví dụ: TS-001)");
            return;
        }

        // Hiệu ứng loading trên nút
        const originalText = trackBtn.innerHTML;
        trackBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        trackBtn.disabled = true;

        try {
            // URL Google Apps Script của bạn
            const webAppUrl = `https://script.google.com/macros/s/AKfycbxDJh99SlEBbaxqC3ZOYz-zK5cmO04OGn10hzMCGYY3lbu5RWNo6IKXGFGRkTGiJENh/exec?jobId=${encodeURIComponent(jobId)}`;
            
            const response = await fetch(webAppUrl);
            const result = await response.json();
            
            if (result.status && result.status !== "Mã không tồn tại") {
                // Hiển thị thông báo chuyên nghiệp hơn thay vì alert thuần
                alert(`📋 KẾT QUẢ TRA CỨU:\n----------------------\n👤 Khách hàng: ${result.customer}\n⚙️ Trạng thái: ${result.status}`);
            } else {
                alert("❌ Không tìm thấy mã này. Vui lòng kiểm tra lại!");
            }
        } catch (error) {
            console.error("Lỗi kết nối:", error);
            alert("⚠️ Lỗi kết nối server. Hãy đảm bảo mã Script đã được Deploy công khai!");
        } finally {
            trackBtn.innerHTML = originalText;
            trackBtn.disabled = false;
        }
    }

    // Gán sự kiện click cho nút
    if (trackBtn) {
        trackBtn.onclick = handleSearch;
    }

    // Cho phép nhấn Enter để tìm kiếm
    if (trackInput) {
        trackInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }

    // 4. Hiệu ứng hiển thị thẻ (Fade-in animation)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Thêm class bổ trợ cho hiệu ứng cuộn
const style = document.createElement('style');
style.innerHTML = `.show { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);
document.addEventListener('DOMContentLoaded', function() {
    // فیلتر کردن اخبار بر اساس دسته‌بندی
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
   
    if (filterButtons.length > 0 && newsCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // حذف کلاس active از همه دکمه‌ها
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // اضافه کردن کلاس active به دکمه کلیک شده
                this.classList.add('active');
               
                const filterValue = this.getAttribute('data-filter');
               
                // فیلتر کردن کارت‌ها
                newsCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});

// ==================== سیستم مدیریت وضعیت ورود ====================
class AuthSystem {
    constructor() {
        this.checkLoginStatus();
    }

    // بررسی وضعیت ورود
    checkLoginStatus() {
        const loggedIn = localStorage.getItem('loggedIn');
        const userRole = localStorage.getItem('userRole');
       
        if (loggedIn === 'true' && window.location.pathname.includes('login.html')) {
            window.location.href = 'dashboard.html';
            return;
        }
       
        if (loggedIn !== 'true' && window.location.pathname.includes('dashboard.html')) {
            window.location.href = 'login.html';
            return;
        }
    }

    // ورود به سیستم
    login(username, password) {
        // در حالت واقعی اینجا به سرور وصل می‌شویم
        // برای نمونه، یک بررسی ساده می‌کنیم
        if (username && password) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', username);
            localStorage.setItem('userRole', 'student');
            localStorage.setItem('studentId', '40123456');
           
            return true;
        }
        return false;
    }

    // خروج از سیستم
    logout() {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('userRole');
        localStorage.removeItem('studentId');
        window.location.href = 'login.html';
    }

    // دریافت اطلاعات کاربر
    getUserInfo() {
        return {
            username: localStorage.getItem('username'),
            role: localStorage.getItem('userRole'),
            studentId: localStorage.getItem('studentId')
        };
    }
}

// ایجاد نمونه از سیستم احراز هویت
const auth = new AuthSystem();

// نمایش/مخفی کردن رمز عبور
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');
   
    if (!passwordInput || !toggleBtn) return;
   
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// نمایش پیام
function showMessage(message, type) {
    // حذف پیام قبلی اگر وجود دارد
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
   
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        ${type === 'success' ? 'background: #27ae60;' : 'background: #e74c3c;'}
    `;
   
    document.body.appendChild(messageDiv);
   
    // حذف خودکار پیام بعد از 3 ثانیه
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

// نمایش اطلاعات کاربر
function displayUserInfo() {
    const userInfo = auth.getUserInfo();
    if (userInfo.username) {
        const userNameElement = document.getElementById('userName');
        const studentIdElement = document.getElementById('studentId');
       
        if (userNameElement) {
            userNameElement.textContent = userInfo.username;
        }
        if (studentIdElement && userInfo.studentId) {
            studentIdElement.textContent = userInfo.studentId;
        }
    }
}

// نمایش تاریخ جاری
function showCurrentDate() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    };
   
    try {
        const persianDate = now.toLocaleDateString('fa-IR', options);
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            dateElement.textContent = persianDate;
        }
    } catch (error) {
        console.log('خطا در نمایش تاریخ:', error);
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            dateElement.textContent = '۱۴۰۳/۰۱/۲۰';
        }
    }
}

// مدیریت فرم ورود و سیستم کاربری
document.addEventListener('DOMContentLoaded', function() {
    console.log('صفحه لود شد - بررسی سیستم‌ها');
   
    // مدیریت فرم ورود (اگر در صفحه login هستیم)
    const loginForm = document.getElementById('loginForm');
   
    if (loginForm) {
        console.log('فرم ورود پیدا شد');
       
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('فرم ارسال شد');
           
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
           
            console.log('نام کاربری:', username);
            console.log('رمز عبور:', password);
           
            if (auth.login(username, password)) {
                console.log('ورود موفق');
                showMessage('ورود موفقیت‌آمیز بود! در حال انتقال...', 'success');
               
                setTimeout(() => {
                    console.log('انتقال به پنل کاربری');
                    window.location.href = 'dashboard.html';
                }, 2000);
            } else {
                console.log('ورود ناموفق');
                showMessage('لطفا نام کاربری و رمز عبور را وارد کنید', 'error');
            }
        });
    }

    // مدیریت دکمه خروج (اگر در صفحه dashboard هستیم)
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('آیا مطمئن هستید که می‌خواهید خارج شوید؟')) {
                auth.logout();
            }
        });
    }

    // نمایش اطلاعات کاربر در پنل (اگر در صفحه dashboard هستیم)
    if (window.location.pathname.includes('dashboard.html')) {
        console.log('صفحه پنل کاربری لود شد');
        displayUserInfo();
        showCurrentDate();
    }
});

// برای دیباگ - نمایش وضعیت localStorage
console.log('وضعیت فعلی localStorage:', {
    loggedIn: localStorage.getItem('loggedIn'),
    username: localStorage.getItem('username'),
    userRole: localStorage.getItem('userRole')
});

function showCurrentDate() {
    const now = new Date();
   
    // تبدیل به تاریخ شمسی (ساده)
    const persianMonths = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'حمل',
        'مهر', 'آبان', 'آذر', 'عقرب', '', 'اسفند'
    ];
   
    const persianDays = [
        'شنبه', 'یکشنبه', ' دوشنبه', ' سه‌شنبه',
        ' چهارشنبه', 'پنج شنبه', ' جمعهه'
    ];
   
    // تاریخ نمونه (در حالت واقعی باید تبدیل واقعی انجام شود)
    const day = now.getDay();
    const dayName = persianDays[day];
    const month = persianMonths[now.getMonth()];
    const year = 1404 + (now.getFullYear() - 2025); // تقریبی
   
    const persianDate = `${dayName}، ${now.getDate()} ${month} ${year}`;
   
    const dateElement = document.getElementById('currentDate');
    const todayDateElement = document.getElementById('todayDate');
   
    if (dateElement) {
        dateElement.textContent = persianDate;
    }
    if (todayDateElement) {
        todayDateElement.textContent = persianDate;
    }
}

function initializeNewsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
  
    if (filterButtons.length > 0 && newsCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // حذف کلاس active از همه دکمه‌ها
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.style.opacity = '0.7';
                });
               
                // اضافه کردن کلاس active به دکمه کلیک شده
                this.classList.add('active');
                this.style.opacity = '1';
              
                const filterValue = this.getAttribute('data-filter');
              
                // انیمیشن فیلتر کردن
                newsCards.forEach(card => {
                    card.style.opacity = '0.5';
                    card.style.transform = 'scale(0.95)';
                   
                    setTimeout(() => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                       
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    }, 200);
                });
            });
        });
    }
}

// اضافه کردن این خط در DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNewsFilter();
    // بقیه کدها...
});

function showMessage(message, type) {
    // حذف پیام قبلی اگر وجود دارد
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
  
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <span class="message-icon">${type === 'success' ? '✅' : '❌'}</span>
            <span class="message-text">${message}</span>
        </div>
    `;
   
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        transition: transform 0.4s ease-out;
        ${type === 'success' ?
            'background: linear-gradient(135deg, #27ae60, #2ecc71);' :
            'background: linear-gradient(135deg, #e74c3c, #c0392b);'
        }
    `;
  
    document.body.appendChild(messageDiv);
   
    // انیمیشن نمایش
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
  
    // حذف خودکار پیام بعد از 4 ثانیه
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.transform = 'translateX(-50%) translateY(-100px)';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 400);
        }
    }, 4000);
}

function showLoading(button) {
    const btnText = button.querySelector('.btn-text');
    const btnLoading = button.querySelector('.btn-loading');
   
    if (btnText && btnLoading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
    }
   
    button.disabled = true;
    button.style.opacity = '0.7';
}

// مخفی کردن حالت بارگذاری
function hideLoading(button) {
    const btnText = button.querySelector('.btn-text');
    const btnLoading = button.querySelector('.btn-loading');
   
    if (btnText && btnLoading) {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
   
    button.disabled = false;
    button.style.opacity = '1';
}

// بهبود فرم ورود با loading state
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
       
        const submitBtn = this.querySelector('.login-submit-btn');
        showLoading(submitBtn);
       
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
      
        // شبیه‌سازی تاخیر شبکه
        setTimeout(() => {
            if (auth.login(username, password)) {
                showMessage('ورود موفقیت‌آمیز بود! در حال انتقال...', 'success');
              
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                showMessage('لطفا نام کاربری و رمز عبور را وارد کنید', 'error');
                hideLoading(submitBtn);
            }
        }, 1500);
    });
}
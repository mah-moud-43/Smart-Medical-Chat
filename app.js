// 1. استلام بيانات المستخدم وتخزينها في localStorage
const registrationForm = document.getElementById('registrationForm');
const registrationPage = document.getElementById('registrationPage');
const chatPage = document.getElementById('chatPage');
const responseContainer = document.getElementById('responseContainer');
const responseText = document.getElementById('responseText');

if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // جمع البيانات من الحقول
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const email = document.getElementById('email').value;

        // التحقق من إدخال جميع البيانات
        if (!name || !age || !gender || !email) {
            alert('يرجى ملء جميع الحقول!');
            return;
        }

        // تخزين البيانات في localStorage
        localStorage.setItem('userData', JSON.stringify({ name, age, gender, email }));

        // الانتقال إلى صفحة الأسئلة
        registrationPage.style.display = 'none'; // إخفاء صفحة التسجيل
        chatPage.style.display = 'block'; // إظهار صفحة الأسئلة

        // عرض البيانات المسجلة
        const userData = JSON.parse(localStorage.getItem('userData'));
        document.getElementById('userName').textContent = userData.name;
        document.getElementById('userAge').textContent = userData.age;
        document.getElementById('userGender').textContent = userData.gender;
    });
}

// 2. إرسال السؤال إلى Gemini API
const chatForm = document.getElementById('chatForm');

if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const question = document.getElementById('question').value;

        if (!question.trim()) {
            alert('يرجى كتابة سؤال!');
            return;
        }

        const GEMINI_API_KEY = 'AIzaSyBCPLjrJO5bo0bb23jmSPnMCddaTocxXqA'; // المفتاح الجديد
        const GEMINI_API_URL = 'https://api.gemini.com/v1/chat'; // استبدل بالرابط الرسمي إذا كان مختلفًا

        try {
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GEMINI_API_KEY}`
                },
                body: JSON.stringify({ query: question })
            });

            if (!response.ok) {
                console.error(`HTTP Error: ${response.status}`);
                alert(`خطأ في الاتصال بالـ API: ${response.status}`);
                return;
            }

            const data = await response.json();
            const answer = data.response || 'لم يتم استلام إجابة من الـ API.';

            // عرض الإجابة
            responseText.textContent = answer;
            responseContainer.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            responseText.textContent = 'حدث خطأ أثناء الاتصال بـ Gemini API.';
            responseContainer.style.display = 'block';
        }
    });
}

// 3. اختبار الاتصال بـ Gemini API (للتأكد من المفتاح)
(async () => {
    const GEMINI_API_KEY = 'AIzaSyBCPLjrJO5bo0bb23jmSPnMCddaTocxXqA'; // المفتاح الجديد
    const GEMINI_API_URL = 'https://api.gemini.com/v1/chat'; // استبدل بالرابط الرسمي إذا كان مختلفًا

    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GEMINI_API_KEY}`
            },
            body: JSON.stringify({ query: "اختبر الاتصال بـ API" })
        });

        if (!response.ok) {
            console.error(`HTTP Error: ${response.status}`);
            alert(`خطأ في الاتصال بالـ API: ${response.status}`);
            return;
        }

        const data = await response.json();
        console.log('API Test Response:', data);
        alert('تم الاتصال بالـ API بنجاح!');
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء اختبار الاتصال بـ Gemini API.');
    }
})();

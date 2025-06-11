document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }


    const header = document.getElementById('header');
    if (header && window.location.pathname.endsWith('index.html')) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('bg-black/50', 'backdrop-blur-sm');
            } else {
                header.classList.remove('bg-black/50', 'backdrop-blur-sm');
            }
        });
    }


    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuButton.querySelector('i');

    mobileMenuButton.addEventListener('click', () => {
        const isMenuOpen = !mobileMenu.classList.contains('hidden');
        if (isMenuOpen) {
            mobileMenu.classList.add('hidden');
            menuIcon.setAttribute('data-lucide', 'menu');
        } else {
            mobileMenu.classList.remove('hidden');
            menuIcon.setAttribute('data-lucide', 'x');
        }
        lucide.createIcons();
    });


    if (document.getElementById('calendar-container')) {
        const calendarTitle = document.getElementById('calendar-title');
        const calendarGrid = document.getElementById('calendar-grid');
        const prevMonthBtn = document.getElementById('prev-month');
        const nextMonthBtn = document.getElementById('next-month');

        let currentDate = new Date();

        const renderCalendar = () => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            calendarTitle.textContent = `${year}년 ${month + 1}월`;


            const dayElements = calendarGrid.querySelectorAll('.calendar-day');
            dayElements.forEach(day => day.remove());
            
            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();


            for (let i = 0; i < firstDayOfMonth; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.classList.add('calendar-day');
                calendarGrid.appendChild(emptyCell);
            }


            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = document.createElement('div');
                dayCell.classList.add('calendar-day');
                dayCell.textContent = day;

                const today = new Date();
                if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                    dayCell.classList.add('today');
                }


                const random = Math.random();
                if (random < 0.3) {
                    dayCell.classList.add('booked');
                } else {
                    dayCell.classList.add('available');
                }
                
                calendarGrid.appendChild(dayCell);
            }
        };

        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });

        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });

        renderCalendar();
    }
});

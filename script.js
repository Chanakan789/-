 </main>

    <footer class="main-footer">
        <div class="container">
            <p>&copy; 2025 เว็บไซต์วัฒนธรรมทั่วโลก. รวม 20 ประเทศ.</p>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const navLinks = document.querySelectorAll('.main-nav a[data-page]');
            const contentSections = document.querySelectorAll('.content-section');
            const actionLinks = document.querySelectorAll('a[data-page], .country-nav-buttons a[data-nav]'); 
            
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.addEventListener('keyup', (e) => {
                    filterCountries(e.target.value);
                });
            }

            const showPage = (pageId) => {
                contentSections.forEach(section => {
                    section.classList.remove('active');
                });
                const activeSection = document.getElementById(pageId);
                if (activeSection) {
                    activeSection.classList.add('active');
                    window.scrollTo(0, 0); 
                }

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-page') === pageId) {
                        link.classList.add('active');
                    }
                });
            };
            
            const filterCountries = (searchText) => {
                const cards = document.querySelectorAll('.country-card');
                const filter = searchText.toLowerCase().trim();

                cards.forEach(card => {
                    const countryName = card.querySelector('h3').textContent.toLowerCase();
                    const region = card.getAttribute('data-region') ? card.getAttribute('data-region').toLowerCase() : '';
                    
                    const isRegionMatch = (filter === 'asean' || filter === 'อาเซียน') && region === 'asean' ||
                                        (filter === 'europe' || filter === 'ยุโรป') && region === 'europe' ||
                                        (filter === 'east asia' || filter === 'เอเชียตะวันออก') && region === 'east-asia' ||
                                        (filter === 'north america' || filter === 'อเมริกาเหนือ') && region === 'north-america' ||
                                        (filter === 'south america' || filter === 'อเมริกาใต้') && region === 'south-america'; 

                    const isNameMatch = countryName.includes(filter);

                    if (isNameMatch || isRegionMatch || filter === '') {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            };


            // ลำดับประเทศที่ไม่มีกัมพูชา (20 ประเทศ)
            const countryOrder = [
                'thailand', 'laos', 'vietnam', 'malaysia', 'singapore',
                'indonesia', 'philippines', 'brunei', 'myanmar',
                'france', 'germany', 'italy', 'uk', 'spain', 'russia', 
                'japan', 'korea', 'china', 
                'usa', 'canada', 'mexico', 
                'brazil', 'peru' 
            ];

            const handleCountryNav = (currentId, direction) => {
                const currentIndex = countryOrder.indexOf(currentId);
                let newIndex = currentIndex;
                
                if (direction === 'next') {
                    newIndex = (currentIndex + 1) % countryOrder.length; 
                } else if (direction === 'prev') {
                    newIndex = (currentIndex - 1 + countryOrder.length) % countryOrder.length; 
                } else if (direction === 'home') {
                    showPage('home');
                    return;
                }
                
                // นำทางไปหน้าใหม่
                showPage(countryOrder[newIndex]);
            };

            actionLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault(); 
                    const targetPage = link.getAttribute('data-page');
                    const navAction = link.getAttribute('data-nav');
                    
                    if (targetPage) {
                        showPage(targetPage);
                    } else if (navAction) {
                        const currentActiveSection = document.querySelector('.content-section.active');
                        if (currentActiveSection && currentActiveSection.id !== 'home') {
                            handleCountryNav(currentActiveSection.id, navAction);
                        }
                    }
                });
            });

            // ตั้งค่าหน้าแรกตาม Hash หรือ Home
            const initialHash = window.location.hash.substring(1) || 'home';
            showPage(initialHash);
        });
    </script>

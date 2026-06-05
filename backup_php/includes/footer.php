<?php
/**
 * Footer - Pie de página del sitio
 * 
 * Incluye la sección del footer con enlaces, redes sociales,
 * copyright y el script principal de JavaScript.
 */
?>
    </main>
    
    <!-- ============================================ -->
    <!-- PIE DE PÁGINA                                -->
    <!-- ============================================ -->
    <footer class="main-footer">
        <!-- Sección superior del footer -->
        <div class="footer-top">
            <div class="footer-grid">
                <!-- Columna 1: Acerca de -->
                <div class="footer-col">
                    <a href="index.php" class="nav-logo dynamic-logo footer-logo">
                        <div class="logo-icon">
                            <span class="logo-letter">A</span>
                            <span class="logo-letter">A</span>
                            <span class="logo-letter">R</span>
                            <span class="logo-letter">A</span>
                        </div>
                    </a>
                    <p class="footer-about-text">
                        Desarrollador web y de aplicaciones apasionado por crear soluciones digitales innovadoras y experiencias de usuario excepcionales.
                    </p>
                </div>
                
                <!-- Columna 2: Enlaces rápidos -->
                <div class="footer-col">
                    <h4 class="footer-title">Enlaces Rápidos</h4>
                    <ul class="footer-links">
                        <li><a href="index.php"><i class="fas fa-chevron-right"></i> Inicio</a></li>
                        <li><a href="profile.php"><i class="fas fa-chevron-right"></i> Perfil</a></li>
                        <li><a href="projects.php"><i class="fas fa-chevron-right"></i> Proyectos</a></li>
                    </ul>
                </div>
                
                <!-- Columna 3: Redes sociales -->
                <div class="footer-col">
                    <h4 class="footer-title">Conectar</h4>
                    <div class="footer-social">
                        <a href="https://github.com/RotaruX/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/alexandru-adrian-rotaru-alergus/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="mailto:rotarualex1612@gmail.com" class="social-link" aria-label="Email">
                            <i class="fas fa-envelope"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Sección inferior del footer -->
        <div class="footer-bottom">
            <p class="footer-copyright">
                &copy; <?= date('Y') ?> DevPortfolio. Todos los derechos reservados.
            </p>
            <p class="footer-made-with">
                Hecho con <i class="fas fa-heart" style="color: #00ff88;"></i> y PHP
            </p>
        </div>
    </footer>
    
    <!-- Script principal -->
    <script src="assets/js/main.js"></script>
</body>
</html>

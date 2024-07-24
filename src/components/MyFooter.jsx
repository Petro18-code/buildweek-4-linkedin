import React from 'react';
import './MyFooter.css';

const MyFooter = () => {
    return (
        <footer className="my-footer">
            <div className="footer-container">
                <div className="footer-column">
                    <a href="#about">Informazioni</a>
                    <a href="#accessibility">Accessibilità</a>
                    <a href="#community-guidelines">Informativa sulla community professionale</a>
                    <a href="#careers">Carriera</a>
                </div>
                <div className="footer-column">
                    <a href="#privacy-terms">Privacy e condizioni</a>
                    <a href="#advertising-options">Opzioni per gli annunci pubblicitari</a>
                    <a href="#sales-solutions">Sales Solutions</a>
                    <a href="#mobile">Mobile</a>
                </div>
                <div className="footer-column">
                    <a href="#safety-center">Centro sicurezza</a>
                    <a href="#talent-solutions">Talent Solutions</a>
                    <a href="#marketing-solutions">Soluzioni di marketing</a>
                    <a href="#advertising">Pubblicità</a>
                </div>
                <div className="footer-column">
                    <a href="#small-business">Piccole imprese</a>
                    <a href="#help-center">Domande?</a>
                    <a href="#privacy-settings">Gestisci il tuo account e la tua privacy</a>
                    <a href="#content-recommendations">Trasparenza sui contenuti consigliati</a>
                </div>
                <div className="footer-language">
                    <label htmlFor="language-select">Seleziona lingua</label>
                    <select name="language" id="language-select">
                        <option value="it">Italiano (Italiano)</option>
                        <option value="en">English (English)</option>
                        <option value="fr">Français (Français)</option>
                        <option value="de">Deutsch (Deutsch)</option>
                    </select>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 LinkedIn Corporation</p>
            </div>
        </footer>
    );
}

export default MyFooter;

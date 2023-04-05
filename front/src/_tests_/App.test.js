import {BrowserRouter, BrowserRouter as Router} from 'react-router-dom';
import {fireEvent, render,screen} from '@testing-library/react';
import Salle from "../Salle/Salle"

describe('Salle component', () => {
    it('"Gestion des salles"', () => {
        const { getByText } = render(
            <Router>
                <Salle />
            </Router>
        );
        const gestionDesSalles = getByText('Gestion des salles');
        expect(gestionDesSalles).toBeInTheDocument();
    });

    it('Bouton "Crée une salle" cliquable', () => {
        const { getByText } = render(
            <Router>
                <Salle />
            </Router>
        );

        const create = screen.getByText('Crée une salle');
        fireEvent.click(create);
    })

    it('Nombres de places > 0', () => {
        const {getByText} = render(
            <Router>
                <Salle />
            </Router>
        )


    })

});

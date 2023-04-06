import {BrowserRouter, BrowserRouter as Router} from 'react-router-dom';
import {fireEvent, render,screen,waitFor} from '@testing-library/react';
import Salle from "../Salle/Salle"
import Signin from "../Signin/Signin";

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

    // it('test input login', async () => {
    //     const {container, getByLabelText, getByRole} = render(
    //         <Router>
    //             <Signin />
    //         </Router>
    //     );
    //     const emailInput = getByLabelText('Email');
    //     const passwordInput = getByLabelText('mot de passe');
    //     const submitButton = getByRole('button', {name: 'OK'});
    //
    //     fireEvent.change(emailInput, {target: {value: 'theo@emp.com'}});
    //     fireEvent.change(passwordInput, {target: {value: 'theo'}});
    //     fireEvent.click(submitButton);
    //
    //     await waitFor(() => expect(container.querySelector('.person-title')).toBeTruthy());
    // });
});

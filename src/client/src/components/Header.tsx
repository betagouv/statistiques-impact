import { Header as DSFRHeader } from '@codegouvfr/react-dsfr/Header';

function Header() {
    return (
        <DSFRHeader
            brandTop={<>Impact et qualité</>}
            homeLinkProps={{
                to: '/',
                title: 'Accueil',
            }}
        />
    );
}

export { Header };

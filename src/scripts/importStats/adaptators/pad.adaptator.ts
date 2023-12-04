import axios from 'axios';
import { logger } from '../../../lib/logger';
import { dateHandler } from '../utils';
import { PRODUCTS } from '../../../constants';

const padAdaptator = { fetch };

type padApiOutputType = {
    dateInf: string;
    dateSup: string;
    activeUsers: number;
};

const productName = PRODUCTS.PAD.name;

async function fetch() {
    const url = `https://pad.numerique.gouv.fr/stats/users/lastMonth`;
    const result = await axios.get<padApiOutputType>(url);
    const padApiOutput = result.data;

    let indicatorDtos = [];
    const indicatorName = 'utilisateurs actifs';

    try {
        const date_debut = dateHandler.formatDate(padApiOutput.dateInf);
        const date = dateHandler.formatDate(padApiOutput.dateSup);
        const value = Number(padApiOutput.activeUsers);
        if (isNaN(value)) {
            throw new Error(`activeUsers "${padApiOutput.activeUsers}" is NaN`);
        }

        indicatorDtos.push({
            date,
            date_debut,
            valeur: value,
            indicateur: indicatorName,
            nom_service_public_numerique: PRODUCTS.PAD.name,
            unite_mesure: 'unité',
            frequence_monitoring: 'mensuelle',
            est_automatise: true,
            est_periode: true,
        });
    } catch (error) {
        logger.error({
            productName,
            indicator: indicatorName,
            message: error as string,
        });
    }

    return indicatorDtos;
}

export { padAdaptator };

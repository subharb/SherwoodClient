import React from 'react';
import DoughnutChart from './DoughnutChart';
import { IInsurance } from '../../../constants/types';
import { Translate } from 'react-localize-redux';
import Loader from '../../../components/Loader';

interface BillingInsuranceBarsProps {
    loading: boolean,
    insurances: IInsurance[],
    currency: string,
    locale: string,
    borderColor:any,
    stats: { [insuranceCode: string]: number },
}

const BillingInsuranceBars: React.FC<BillingInsuranceBarsProps> = ({ loading, borderColor, locale, stats, insurances, currency }) => {
    if(loading){
        return <Loader />
    }
    const labels = Object.keys(stats).map((code) => insurances.find((insurance) => insurance.code === code)?.name);
    const totalBilling = Object.values(stats).reduce((a, b) => a + b, 0);
    const percentsInsurance = Object.keys(stats).map((key) => ((stats[key] / totalBilling) * 100).toFixed(2));
    const amountTitle = [<Translate id="hospital.analytics.graphs.billing-insurances.amount" />, "("+currency+")"]
    const billinPerInsurance = Object.keys(stats).map((key) => stats[key]);
    return (
        <>
            <DoughnutChart title={<Translate id="hospital.analytics.graphs.billing-insurances.title" />} 
                labels={labels}
                table={{ 
                    title: <Translate id="hospital.analytics.graphs.billing-insurances.title" />, 
                    columns: [amountTitle] 
                }}
                innerInfo={{ 
                    title: <Translate id="hospital.analytics.graphs.billing-insurances.title" />, 
                    value: new Intl.NumberFormat(locale).format(totalBilling) 
                }}
                datasets={[
                    {
                        data: billinPerInsurance,
                        percents: percentsInsurance,
                        backgroundColor: [ "#ef6657", "#f4b400", "#00a3e0", "#f47835", "#7f7f7f"],
                        borderWidth: 5,
                        borderColor: borderColor,
                    }
                ]} />
        </>
    );
};

export default BillingInsuranceBars;

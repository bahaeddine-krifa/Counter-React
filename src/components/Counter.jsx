import { useEffect, useState } from "react";

const Counter = () => {

    const [count, setCount] = useState(() => {
        const sauvegarde = localStorage.getItem('mon-compteur-valeur');
        return sauvegarde ? parseInt(sauvegarde, 10) : 0;
    });
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('No clicks yet');
    const [totalClics, setTotalClics] = useState(0);
    const [historique, setHistorique] = useState([]);

    useEffect(() => {
        localStorage.setItem('mon-compteur-valeur', count);
    }, [count]);

    useEffect(() => {
        document.title = `Counter: ${count}`;
    }, [count]);

    const handleIncrement = () => {
        const nouveauCompte = count + step;
        setCount(nouveauCompte);
        setMessage('Added' + step );
        setTotalClics( totalClics + 1);

        const action = '+' + step;
        setHistorique([... historique , action ]);
    };

    const handleDecrement = () => {
        const nouveauCompte = count - step;
        setCount(nouveauCompte);
        setMessage('Subtracted' + step );
        setTotalClics( totalClics + 1);

        const action = '-' + step;
        setHistorique([... historique , action ]);
    };

    const handleReset = () => {
        setCount(0);
    };

    const getStyleClass = () => {
        if ( count > 0) return 'counter-display positive';
        if ( count < 0) return 'counter-display negative';
        return 'counter-display zero';
    };

  return (
    <div className =" counter-card ">
        <div className ={getStyleClass()} >{ count } </div>

        <div className ="btn-group ">
            <button className ="btn btn-dec" onClick ={ handleDecrement }>- {step}</button>
            <button className =" btn btn-reset " onClick ={ handleReset }>Reset</button>
            <button className =" btn btn-inc" onClick ={ handleIncrement }>+ {step}</button>
        </div >

        <div className ="step-control ">
            <label > Increment Step: </label>
            <select value ={step} onChange ={(e) => setStep(parseInt(e.target.value , 10) )}>
                <option value ="1" >1 </option>
                <option value ="2" >2 </option>
                <option value ="5" >5 </option>
                <option value ="10" >10 </option>
            </select >
        </div>

        <div className =" history - card ">
            <p><strong> Last Action: </strong> { message } </p>
            <p><strong> Total Clicks: </strong> { totalClics } </p>
            {historique.length > 0 && (
            <p><strong> History: </strong> {historique.join(', ')}</p>
            )}
        </div >

    </div>
  )
}

export default Counter
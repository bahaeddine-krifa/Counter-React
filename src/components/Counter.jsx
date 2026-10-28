import { useEffect, useState } from "react";

const Counter = () => {
    const MIN = -50;
    const MAX = 50;

    const [count, setCount] = useState(() => {
        const sauvegarde = localStorage.getItem('mon-compteur-valeur');
        return sauvegarde ? parseInt(sauvegarde, 10) : 0;
    });
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('No clicks yet');
    const [totalClics, setTotalClics] = useState(0);
    const [historique, setHistorique] = useState(() => {
        const sauvegarde = localStorage.getItem("mon_compteur_historique");
        return sauvegarde ? JSON.parse(sauvegarde) : [];
    });

    useEffect(() => {
        localStorage.setItem('mon-compteur-valeur', count);
    }, [count]);

    useEffect(() => {
        document.title = `Counter: ${count}`;
    }, [count]);

    useEffect(() => {
        localStorage.setItem("mon_compteur_historique",JSON.stringify(historique));
    }, [historique]);

    const handleIncrement = () => {
        if (count + step > MAX) {
            console.log("Seuil maximal de 50 atteint !");
            setMessage("Seuil maximal de 50 atteint !");
            return;
        }
        const nouveauCompte = count + step;
        setCount(nouveauCompte);
        setMessage('Added' + step );
        setTotalClics( totalClics + 1);

        const action = '+' + step;
        setHistorique([... historique , action ]);
    };

    const handleDecrement = () => {
        if (count - step < MIN) {
            setMessage("Seuil minimal de -50 atteint !");
            return;
        }
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

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowUp") {
                handleIncrement();
            }

            if (e.key === "ArrowDown") {
                handleDecrement();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [count, step]);

    const getStyleClass = () => {
        if ( count > 0) return 'counter-display positive';
        if ( count < 0) return 'counter-display negative';
        return 'counter-display zero';
    };

  return (
    <div className =" counter-card ">
        <div className ={getStyleClass()} >{ count } </div>

        <div className ="btn-group ">
            <button className ="btn btn-dec" onClick ={ handleDecrement } disabled={count - step < MIN}>- {step}</button>
            <button className =" btn btn-reset " onClick ={ handleReset }>Reset</button>
            <button className =" btn btn-inc" onClick ={ handleIncrement } disabled={count + step > MAX}>+ {step}</button>
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
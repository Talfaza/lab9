// CompteForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config";

function CompteForm({ onAddSuccess }) {
    const [compte, setCompte] = useState({ solde: '', dateCreation: '', type: 'COURANT' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        setCompte({ ...compte, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!compte.solde || !compte.dateCreation) {
            setMessage({ text: 'Solde et date sont requis', type: 'error' });
            return;
        }

        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            await axios.post(`${API_BASE_URL}/comptes`, {
                solde: Number(compte.solde),
                dateCreation: compte.dateCreation,
                type: compte.type
            });
            setCompte({ solde: '', dateCreation: '', type: 'COURANT' });
            setMessage({ text: 'Compte ajouté avec succès !', type: 'success' });
            onAddSuccess?.(); // Refresh list
        } catch (error) {
            setMessage({ text: 'Erreur lors de l’ajout', type: 'error' });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-card">
            <h2>Ajouter un Compte</h2>

            {message.text && (
                <div className={`msg ${message.type}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label>Solde</label>
                    <input
                        type="number"
                        name="solde"
                        value={compte.solde}
                        onChange={handleChange}
                        placeholder="7000"
                        required
                    />
                </div>

                <div className="field">
                    <label>Date de Création</label>
                    <input
                        type="date"
                        name="dateCreation"
                        value={compte.dateCreation}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="field">
                    <label>Type</label>
                    <select name="type" value={compte.type} onChange={handleChange}>
                        <option value="COURANT">Courant</option>
                        <option value="EPARGNE">Épargne</option>
                    </select>
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? (
                        <>
                            <span className="spinner"></span> Ajout...
                        </>
                    ) : (
                        'Ajouter'
                    )}
                </button>
            </form>

            <style jsx>{`
                .form-card {
                    margin: 0;
                    padding: 2rem;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                    font-family: 'Segoe UI', sans-serif;
                }
                h2 {
                    text-align: center;
                    color: #4A4A4A;
                    margin-bottom: 1.5rem;
                    font-size: 1.6rem;
                }
                .msg {
                    padding: 0.8rem 1rem;
                    border-radius: 8px;
                    margin-bottom: 1rem;
                    font-weight: 500;
                    text-align: center;
                }
                .msg.success { background: #E8F0FE; color: #4A90E2; }
                .msg.error   { background: #FBE9E7; color: #D32F2F; }

                .field {
                    margin-bottom: 1.2rem;
                }
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    color: #4A4A4A;
                }
                input, select {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border: 1.5px solid #ddd;
                    border-radius: 8px;
                    font-size: 1rem;
                    transition: all 0.2s;
                }
                input:focus, select:focus {
                    outline: none;
                    border-color: #4A90E2;
                    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.15);
                }
                .submit-btn {
                    width: 100%;
                    padding: 0.9rem;
                    background: #4A90E2;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: 0.2s;
                }
                .submit-btn:hover { background: #357ABD; }
                .submit-btn:disabled { background: #BDC3C7; cursor: not-allowed; }
                .spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid #fff;
                    border-top-color: transparent;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                    margin-right: 8px;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default CompteForm;
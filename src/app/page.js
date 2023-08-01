'use client'
import Layout from "./components/layout"
import Header from "./components/header"
import Board from "./components/board"
import Modal from "./modal"
import React,{ useState, useEffect } from 'react'




export default function Home() {
  const [modal, setModal] = useState(false)
  const portalContainer = React.useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);

  React.useEffect(() => {
    portalContainer.current = document.createElement('div');
    portalContainer.current.id = 'portal';
    document.body.appendChild(portalContainer.current);

    return () => {
      document.body.removeChild(portalContainer.current);
    };
  }, []);

  function handleOpenModal( title, user, comments) {
    
    setModal(true);
    setSelectedCard({
      title,
      user,
      comments,
      
    })    
    console.log(selectedCard);
    
    
  }

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <Layout>

      <Modal isActive={modal} handleCloseModal={handleCloseModal} selectedCard={selectedCard}/>
      <Header />
      <Board setModal={setModal} handleCloseModal={handleCloseModal} handleOpenModal={handleOpenModal} />
    
    </Layout>

  )
}

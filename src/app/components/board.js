'use client'
import List from "./list"
import Card from "./card"
import { todoList, inProgressList, doneList } from "./data"
import { useState } from "react"
import Image from "next/image"

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import '../responsive.css';

function Board({ setModal, handleOpenModal, handleCloseModal }) {
  const [dragged, setDragged] = useState(null)
  const [listOfLists, setListOfLists] = useState({
    todoList,
    inProgressList,
    doneList
  })



  function handleDrop(event) {
    const list = event.currentTarget.dataset.id
    const listOfListsClone = structuredClone(listOfLists)

    const newList = listOfListsClone[dragged.list].filter(item => item.id !== dragged.data.id)

    listOfListsClone[dragged.list] = newList
    listOfListsClone[list].push(dragged.data)
    setListOfLists(listOfListsClone)
  }


  return (
    <div className="flex flex-col flex-1 p-4 text-white ">
      <div className="flex items-center gap-2 pb-4">
        <h1 className="text-2xl font-bold">
          Development
        </h1>
        <span className="text-2xl"> | </span>
        <div className="flex">
          <div className="">
            <Image src='/avatar.png' height={32} width={32} />
          </div>
          <div className="-ml-2">
            <Image src='/avatar-2.png' height={32} width={32} />
          </div>
          <div className="-ml-2">
            <Image src='/avatar-3.png' height={32} width={32} />
          </div>
          <div className="-ml-2">
            <Image src='/avatar-4.png' height={32} width={32} />
          </div>
        </div>
        <span className="text-2xl"> | </span>
        <button className="p-2 rounded bg-white/20 hover:bg-white/10">Invite</button>
      </div>
      <main className="flex-1 gap-6 carousel-desktop">
        <List listOfLists={listOfLists} setListOfLists={setListOfLists} title='TODO' handleDrop={handleDrop} id="todoList">
          {
            listOfLists.todoList.map(item => (
              <Card handleOpenModal={handleOpenModal}
                {...item}
                key={item.id}
                setDragged={setDragged} />
            ))

          }

        </List>
        <List listOfLists={listOfLists} setListOfLists={setListOfLists} title='In Progress' handleDrop={handleDrop} id='inProgressList'>
          {
            listOfLists.inProgressList.map(item => (
              <Card handleOpenModal={handleOpenModal}
                {...item}
                key={item.id}
                setDragged={setDragged} />
            ))
          }
        </List>
        <List listOfLists={listOfLists} setListOfLists={setListOfLists} title='Done' handleDrop={handleDrop} id='doneList'>
          {
            listOfLists.doneList.map(item => (
              <Card handleOpenModal={handleOpenModal}
                {...item}
                key={item.id}
                setDragged={setDragged} />
            ))
          }
        </List>

      </main>
      <div className=" carousel-mobile">
        <Carousel showThumbs={false} renderIndicator={false}>
          <div className="">
            <List listOfLists={listOfLists} setListOfLists={setListOfLists} title='TODO' handleDrop={handleDrop} id="todoList">
              {
                listOfLists.todoList.map(item => (
                  <Card handleOpenModal={handleOpenModal}
                    {...item}
                    key={item.id}
                    setDragged={setDragged} />
                ))

              }

            </List>
          </div>
          <div>
            <List listOfLists={listOfLists} setListOfLists={setListOfLists} title='In Progress' handleDrop={handleDrop} id='inProgressList'>
              {
                listOfLists.inProgressList.map(item => (
                  <Card className="" handleOpenModal={handleOpenModal}
                    {...item}
                    key={item.id}
                    setDragged={setDragged} />
                ))
              }
            </List>
          </div>
          <div>
            <List listOfLists={listOfLists} setListOfLists={setListOfLists} title='Done' handleDrop={handleDrop} id='doneList'>
              {
                listOfLists.doneList.map(item => (
                  <Card handleOpenModal={handleOpenModal}
                    {...item}
                    key={item.id}
                    setDragged={setDragged} />
                ))
              }
            </List>
          </div>
        </Carousel>
      </div>
    </div>
  )
}

export default Board

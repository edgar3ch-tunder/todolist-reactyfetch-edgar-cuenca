import React from "react";
import TodoList from "./TodoList"; 

const Home = () => {
    return (
        <div className="text-center">
            
            <TodoList />
            
            <footer className="mt-5">
                <p>
                    Made by  Edgar Cuenca Hernandez
                </p>
            </footer>
        </div>
    );
};

export default Home;
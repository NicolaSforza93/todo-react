import { useState, useEffect } from 'react';
import '../TodoApp.css';


function TodoApp() {
    // const [todos, setTodos] = useState([]);
    const [todos, setTodos] = useState(() => {
        // Leggiamo i todo da localStorage al caricamento dell'app
        const storeTodos = localStorage.getItem('todos');
        return storeTodos ? JSON.parse(storeTodos) : [];
    });
    const [newTodo, setNewTodo] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    // Tiene traccia del todo che modifico
    const [editedTodo, setEditedTodo] = useState({ index: null, text: '' });

    // Aggiorniamo localStorage ogni volta che i todo cambiano
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleTodoChange = (e) => {
        setNewTodo(e.target.value);
    }

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (newTodo.trim() !== '') {
            setTodos([...todos, { text: newTodo.charAt(0).toUpperCase() + newTodo.slice(1), done: false }]);
            setNewTodo('');
            // console.log(todos)
        }
    }

    const handleTodoDelete = (index, e) => {
        e.stopPropagation();
        const newTodo = [...todos];
        newTodo.splice(index, 1);
        setTodos(newTodo);
    }

    const toggleTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].done = !updatedTodos[index].done;
        setTodos(updatedTodos);
    }

    const handleTodoEdit = (index, text) => {
        setIsEdit(true);
        setEditedTodo({ index, text });
    };

    const handleTodoSave = () => {
        const updatedTodos = [...todos];
        updatedTodos[editedTodo.index].text = editedTodo.text;
        setTodos(updatedTodos);
        setIsEdit(false);
        setEditedTodo(null);
    };




    return (
        <>
            <figure className='marker absolute'>
                <img src="/76321-Photoroom.png-Photoroom (2).png" alt="" />
            </figure>
            <div>
                <img className='circle relative' src="/6382f018-a739-4a66-ad9e-47e8cd031af1-Photoroom.png-Photoroom.png" alt="" />
                <h1 className='title uppercase text-3xl text-center absolute'>Todo List</h1>
            </div>
            <div>
                <form className='flex py-7 w-9/12 mx-auto'>
                    <input placeholder='New Todo' type="text" value={newTodo} onChange={handleTodoChange} className='grow focus:outline-none bg-inherit' />
                    <button className='btn-add' type='submit' onClick={handleAddTodo}>
                        <span>
                            Add
                        </span>
                    </button>
                </form>
                {
                    todos.length > 0 ?
                        <ul className='todos'>
                            {
                                todos.map((todo, index) => (
                                    <li key={index} className="todo cursor-pointer flex gap-4">
                                        {
                                            isEdit && editedTodo.index === index ?
                                                <>
                                                    <div className="checkbox-wrapper">
                                                        <input id={index} type="checkbox" checked={todo.done} />
                                                        <label className="check-box align-middle" htmlFor={index}></label>
                                                    </div>
                                                    <input type="text" value={editedTodo.text} onChange={(e) => setEditedTodo({ ...editedTodo, text: e.target.value })} className='grow focus:outline-none bg-inherit' />
                                                    <button onClick={handleTodoSave} className='btn-save'>
                                                        save
                                                    </button>
                                                </>
                                                :
                                                <>
                                                    <div className="checkbox-wrapper">
                                                        <input id={index} type="checkbox" checked={todo.done} onChange={() => toggleTodo(index)} />
                                                        <label className="check-box align-middle" htmlFor={index}></label>
                                                    </div>
                                                    <span className='grow'>{todo.text}</span>
                                                    <div className='flex gap-2'>
                                                        <button onClick={() => handleTodoEdit(index, todo.text)} className='btn-edit text-blue-500'>
                                                            edit
                                                        </button>
                                                        <button onClick={(e) => handleTodoDelete(index, e)} className='btn-delete text-red-500'>
                                                            delete
                                                        </button>
                                                    </div>
                                                </>
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                        :
                        <div className='flex flex-col items-center'>
                            <p>Non ci sono todo</p>
                            <figure className='w-16'>
                                <img src="/87898-OI9W4D-332-Photoroom.png-Photoroom.png" alt="" />
                            </figure>
                        </div>
                }
            </div>
        </>
    )
}

export default TodoApp;
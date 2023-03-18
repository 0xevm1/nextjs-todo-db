import React from 'react';
import dayjs from 'dayjs';

const TodoListItem = ({ todo }) => {
    return (
        <li key={todo.id} className="relative items-center justify-between px-2 py-6 border-b bg-white rounded m-3">
            <div>
                <p className="inline-block mt-1 text-lg">{todo.description}</p>

            </div>
            <div>Priority: <p className="inline-block mt-1 text-gray-600">{todo.priority}</p></div>
            <span className="text-gray-600">Due: {dayjs.unix(todo.due).format('DD/MM/YYYY')}</span>
        </li>
    );
};

export default TodoListItem;

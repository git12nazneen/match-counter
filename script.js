// Action Types
const ADD_MATCH = 'add_match';
const DELETE_MATCH = 'delete_match';
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const RESET = 'reset';

// Action Creators
const addMatch = () => ({ type: ADD_MATCH });
const deleteMatch = (id) => ({ type: DELETE_MATCH, payload: id });
const increment = (id, value) => ({ type: INCREMENT, payload: { id, value } });
const decrement = (id, value) => ({ type: DECREMENT, payload: { id, value } });
const reset = () => ({ type: RESET });

// Initial State
const initialState = {
    matches: [{ id: 1, score: 0 }],
};

// Reducer
const matchReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MATCH:
            return {
                ...state,
                matches: [
                    ...state.matches,
                    { id: state.matches.length + 1, score: 0 },
                ],
            };
        case DELETE_MATCH:
            return {
                ...state,
                matches: state.matches.filter((match) => match.id !== action.payload),
            };
        case INCREMENT:
            return {
                ...state,
                matches: state.matches.map((match) =>
                    match.id === action.payload.id
                        ? { ...match, score: match.score + action.payload.value }
                        : match
                ),
            };
        case DECREMENT:
            return {
                ...state,
                matches: state.matches.map((match) =>
                    match.id === action.payload.id
                        ? { ...match, score: Math.max(0, match.score - action.payload.value) }
                        : match
                ),
            };
        case RESET:
            return {
                ...state,
                matches: state.matches.map((match) => ({
                    ...match,
                    score: 0,
                })),
            };
        default:
            return state;
    }
};

// Create Store
const store = Redux.createStore(matchReducer);



const renderMatches = () => {
    const state = store.getState();
    const allMatches = document.getElementById('all-matches');
    allMatches.innerHTML = '';

    state.matches.forEach((match) => {
        const matchDiv = document.createElement('div');
        matchDiv.classList.add('match');
        matchDiv.innerHTML = `
            <div class="wrapper">
                <button class="lws-delete" data-id="${match.id}">
                    <img src="https://images.pexels.com/photos/54101/magic-cube-cube-puzzle-play-54101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="delete" />
                </button>
                <h3 class="lws-matchName">Match ${match.id}</h3>
            </div>
            <div class="inc-dec">
                <form class="incrementForm" data-id="${match.id}">
                    <h4>Increment</h4>
                    <input type="number" class="lws-increment" />
                </form>
                <form class="decrementForm" data-id="${match.id}">
                    <h4>Decrement</h4>
                    <input type="number" class="lws-decrement" />
                </form>
            </div>
            <div class="numbers">
                <h2 class="lws-singleResult">${match.score}</h2>
            </div>
        `;
        allMatches.appendChild(matchDiv);
    });

    // Add event listeners for delete, increment, decrement
    document.querySelectorAll('.lws-delete').forEach((button) =>
        button.addEventListener('click', (event) => {
            const id = parseInt(event.target.closest('button').getAttribute('data-id'));
            store.dispatch(deleteMatch(id));
        })
    );

    document.querySelectorAll('.incrementForm').forEach((form) =>
        form.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const id = parseInt(form.getAttribute('data-id'));
                const value = parseInt(form.querySelector('.lws-increment').value, 10);
                if (!isNaN(value)) {
                    store.dispatch(increment(id, value));
                    form.querySelector('.lws-increment').value = ''; // Clear input
                }
            }
        })
    );

    document.querySelectorAll('.decrementForm').forEach((form) =>
        form.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const id = parseInt(form.getAttribute('data-id'));
                const value = parseInt(form.querySelector('.lws-decrement').value, 10);
                if (!isNaN(value)) {
                    store.dispatch(decrement(id, value));
                    form.querySelector('.lws-decrement').value = ''; // Clear input
                }
            }
        })
    );
};

store.subscribe(renderMatches);
renderMatches(); // Initial render



// Add Another Match
document.querySelector('.lws-addMatch').addEventListener('click', () => {
    store.dispatch(addMatch());
});

// Reset Scores
document.querySelector('.lws-reset').addEventListener('click', () => {
    store.dispatch(reset());
});

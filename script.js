
    // all-matches element
    const allMatches = document.getElementById('all-matches');

    // button element
    const add_match = document.getElementById('add_match');

    // button click add event listener
    add_match.addEventListener('click', function() {
        // create div
        const newMatch = document.createElement('div');
        newMatch.className='all-matches'

        newMatch.innerHTML=`
         <div  class="match">
                <div class="wrapper">
                    <button class="lws-delete">
                        <img src="https://images.pexels.com/photos/54101/magic-cube-cube-puzzle-play-54101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </button>
                    <h3 class="lws-matchName">Match 1</h3>
                </div>
                <div class="inc-dec">
                    <form class="incrementForm">
                        <h4>Increment</h4>
                        <input type="number" name="increment" class="lws-increment" />
                    </form>
                    <form class="decrementForm">
                        <h4>Decrement</h4>
                        <input type="number" name="decrement" class="lws-decrement" />
                    </form>
                </div>
                <div class="numbers">
                    <h2 class="lws-singleResult">120</h2>
                </div>
                <br>
            
            </div>
        `
        // append the new child 
        allMatches.appendChild(newMatch);
    });

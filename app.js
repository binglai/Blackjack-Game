var prompt = require('sync-prompt').prompt;

//declare variables
var faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
var suits = ['♠', '♥', '♣', '♦'];
var deck = [];

function generateCards()
{
    var cards = [];
    for(var i = 0 ; i < suits.length; i ++)
    {
        for (var j = 0; j < faces.length; j++)
        {
            var card = {Suit: suits[i], Face: faces[j]};
            cards.push(card);
        }
    }
    return cards;
};

function shuffle(cards)
{
    var temp;
    var i, j, k;
    var newDeck = cards;
    for (i=0; i<cards.length; i++)
    {
        for (j=0; j < newDeck.length; j++)
        {
            k = Math.floor(Math.random() * newDeck.length);
            temp = newDeck[j];
            newDeck[j] = newDeck[k];
            newDeck[k] = temp;
        }
    }
    /*var temp = [];
     for (var i = 0; i < cards.length ; i++)
     {
     temp.push(cards.splice(Math.floor(Math.random()*cards.length),1));
     }*///splice isnt working
    
    temp = cards;
    return cards;
};

function calculateHand(cards)
{
    var i;
    var totalCards = 0;
    for(i=0; i< cards.length; i++)
    {
        var selected = cards[i].Face;
        if(selected === 'A')
        {
            totalCards+=11;
            if(totalCards > 21)
            {
                totalCards-=10;
            }
        }
        else if(selected === 'J' || selected === 'Q' || selected === 'K'){
            totalCards+=10;
        }
        else
        {
            selected = ((cards[i].Face)*1);
            totalCards += selected;
        }
    }
    return totalCards;
};

function determineWinner(playerHand, computerHand)
{
    
    if ((playerHand <= 21 && computerHand<playerHand) || (playerHand <= 21 && computerHand>21))
    {
        return ("Player wins!");
    }
    else if ((computerHand <= 21 && playerHand<computerHand) || (computerHand <= 21 && playerHand>21))
    {
        return ("Computer wins!");
    }
    else if ( (playerHand <= 21 || computerHand <= 21) && playerHand === computerHand )
    {
        return ("Tie!");
    }
    else if ( (playerHand > 21 || computerHand > 21) )
    {
        return ("Bust! You and the player went over 21");
    }
};

//Start of game
//generate cards, shuffle the cards, calculate hand
//var cards = generateCards();
var cardDeck = shuffle(generateCards());
var cardsLeft = cardDeck.length;

while (cardsLeft > 26)
{
    var playerHand= [];
    var computerHand= [];
    playerHand = [cardDeck.pop() , cardDeck.pop()];
    computerHand = [cardDeck.pop() , cardDeck.pop()];
    
    while (calculateHand(computerHand) < 18)
    {
        computerHand.push(cardDeck.pop()) ;
    }
    
    console.log("Your hand is:" , playerHand[0].Face+playerHand[0].Suit, playerHand[1].Face+playerHand[1].Suit, "... for a total of" , calculateHand(playerHand) );
    
    var cont = true;
    while (cont === true && calculateHand(playerHand) < 22)
    {
        
        var person = prompt("(h)it or (s)tay " + "\n");
        //if the person hits
        if (person === 'h')
        {
            playerHand.push(cardDeck.pop()) ;
            var i;
            var cardsPlayer = [];
            for (i=0 ; i <playerHand.length ; i++)
            {
                cardsPlayer.push( playerHand[i].Face + playerHand[i].Suit );
            }
            if (calculateHand(playerHand) < 22)
            {
                cont === true;
            }
            else if (calculateHand(playerHand) > 21)
            {
                //break out
                cont === false;
            }
            else
            {       
                console.log("Your hand is:" , cardsPlayer.toString() , "... for total of" , calculateHand(playerHand) );
            }
        }
        //else the person stands
        else (person === 's' || cont === false)
        {
            
            /*for (var i=0 ; i <playerHand.length ; i++)
            {
                cardsPlayer.push( playerHand[i].Face + playerHand[i].Suit );
                console.log("Your hand is:" , cardsPlayer.toString());
            }*/

            var cardsComputer = [];

            for (var i=0 ; i <computerHand.length ; i++)
            {
                cardsComputer.push( computerHand[i].Face + computerHand[i].Suit );
            }
            
            console.log("Your hand is:" , cardsPlayer.toString() , "(",calculateHand(playerHand),")" , "Computer hand:" , cardsComputer.toString() , "(",calculateHand(computerHand),")");
            console.log(determineWinner( calculateHand(playerHand) , calculateHand(computerHand) ));
            console.log("There are" , cardDeck.length , "cards left in the deck.");
            console.log("-----------------");
            
            if (cardDeck.length <= 26)
            {
                console.log("Less than 26 cards left. Game over!" + "\n");
                break;
            }
            cont = false;
            
        }
            /*console.log("Your hand is:" , cardsPlayer.toString() , "(",calculateHand(playerHand),")" , "Computer hand:" , cardsComputer.toString() , "(",calculateHand(computerHand),")");
            console.log(determineWinner( calculateHand(playerHand) , calculateHand(computerHand) ));
            console.log("There are" , cardDeck.length , "cards left in the deck.");
            console.log("-----------------");*/
    }
    cardsLeft=cardDeck.length;
}

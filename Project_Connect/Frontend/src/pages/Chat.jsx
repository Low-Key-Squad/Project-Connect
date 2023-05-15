import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';


export default function Chat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matches, setMatches] = useState([]);
  const [reciverId,setReciver]=useState([]);
  const userId = document.cookie
    .split('; ')
    .find((row) => row.startsWith('user_id='))
    ?.split('=')[1];

  useEffect(() => {
    getMatchList();
  }, []);

  const getMatchList = () => {
    const payload = {
      user1_id: userId,
    };
    axiosClient.post('/matches', payload)
    .catch(error => {
      console.error(error);
    })
      .then(response => {
        setMatches(response.data);
      });
  };

  const getChatHistory = () => {
    const config = {
      params: {
        match_id: selectedMatch,
      },
    };
  
    axiosClient.get('/history', config)
      .then((response) => {
        if (response && response.data) {
          setChatHistory(response.data);
        }
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania historii czatu:', error);
      });
  };

  const sendMessage = () => {
    axiosClient.post('/createmessage', {
      match_id: selectedMatch,
      sender_id: userId,
      receiver_id: 2,
      message: message,
    }).catch(error => {
      console.error(error);
    })
      .then(response => {
        console.log('Wiadomość wysłana');
        setMessage('');
        getChatHistory(selectedMatch);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleMatchClick = (matchId) => {
    axiosClient.post('/reciver', {
      match_id: matchId,
    })
    .catch(error => {
      console.error(error);
    })
    setSelectedMatch(matchId);
    getChatHistory(matchId);
  };

  return (
    <div>
      <Link to="/menu">
        <button className='Menu-button'>Menu</button>
      </Link>
      <h2>Chat</h2>

      <div>
        <p>Wybierz czat:</p>
        <div>
          {matches.map(match => (
            <button
              key={match.id}
              onClick={() => handleMatchClick(match.id)}
              className={selectedMatch === match.id ? 'selected' : ''}
            >
              {match.name}
            </button>
          ))}
        </div>
      </div>

      {selectedMatch && (
        <>
           <div name="message">
           {chatHistory.map((chat, index) => (
              <div key={index}>
                {chat.sender_id !== userId ? (
                      <span>{chat.name}: </span>
                    ) : (
                      <span>Ty: </span>
                    )}
                {chat.message}
              </div>
            ))}
          </div>
           
          <div>
            <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Wyślij</button>
          </div>
        </>
      )}
    </div>
  );
}
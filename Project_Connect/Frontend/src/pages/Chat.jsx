import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';


export default function Chat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matches, setMatches] = useState([]);
  const [user2Id,setuser2Id]=useState(null);
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
      .then(response => {
        console.log(response.data); 
        const matchData = response.data.map(match => ({
          ...match,
          name: match.name ? match.name : 'Unknown User',
        }));
        setMatches(matchData);
      })
      .catch(error => {
        console.error(error);
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
      receiver_id: user2Id,
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
    });
  
    setSelectedMatch(matchId);
  };
  
  useEffect(() => {
    if (selectedMatch) {
      getChatHistory(selectedMatch);
  
      const payload3 = {
        match_id: selectedMatch,
        user_id: userId,
      };
  
      axiosClient.post('/user2', payload3)
        .then(response => {
          setuser2Id(response.data);
          console.log(user2Id);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedMatch]);
  useEffect(() => {
    
    const refreshInterval = setInterval(() => {
      if (selectedMatch) {
        getChatHistory(selectedMatch);
      }
    }, 5000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [selectedMatch]);

  const deleteMatch = () => {
    if (window.confirm('Czy na pewno chcesz usunąć parę?')) {
      axiosClient.post('/deletematch', {
        id: selectedMatch,
      })
      .then(response => {
        console.log('Para została usunięta.');
        setSelectedMatch(null);
        getMatchList();
        })
        .catch(error => {
        console.error(error);
        });
        }
    };
  return (
      <div>
        <Link to="/menu">
          <button className="Menu-button">Menu</button>
        </Link>
        <h2>Chat</h2>
        <div name="CHAT">
          <div className="Chat-container">
            <p>Wybierz czat:</p>
            <div>
              {matches.map(match => (
                <button
                  key={match.id}
                  onClick={() => handleMatchClick(match.id)}
                  className={selectedMatch === match.id ? 'selected' : ''}
                  name="match-button"
                >
                  {match.name}
                </button>
              ))}
            </div>
          </div>
          <div className="logchat">
            {selectedMatch && (
              <>
                <div className="message">
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
    
                <div className="input-container">
                  <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
                  <button onClick={sendMessage} name="send-message-button">Wyślij</button>
                </div>
                <button onClick={deleteMatch}>Usuń parę</button>
              </>
            )}
          </div>
        </div>
      </div>
    );
}
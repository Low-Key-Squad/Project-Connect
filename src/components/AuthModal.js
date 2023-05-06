const AuthModal = ({setShowModal}) => {

    const handleClick = () => {
        setShowModal(false)
    }

        return (
            <div className="auth-modal">
                <div onClick={handleClick}>ⓧ</div>
                AuthModal
            </div>
        )
}

export default AuthModal
import {useState} from 'react'
import {useTranslation} from 'react-i18next';

const expirationOptions = [
    {label: '1 day', value: 1},
    {label: '7 days', value: 7},
    {label: '30 days', value: 30},
    {label: '1 year', value: 365},
];

function TinyUrlBody() {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [expiration, setExpiration] = useState<number>(1);

    const {t} = useTranslation();

    // todo
    const generateShortUrl = () => {
        setShortUrl(`https://rryan.me/s/${Math.random().toString(36).substring(7)}`);
    };

    return (
        <main className="flex-grow mt-18 mb-18 w-full ">
            <div className=" bg-white p-10 mx-auto float-center shadow-coolGray mg-0-auto max-w-2xl rd-2xl">
                <div className="flex  bg-gray-200 p-2 rounded-lg">
                    <div className="mr-2 text-gray-500">
                        <p>🌏</p>
                    </div>

                    <input
                        type="text"
                        placeholder={t('enterLongUrl')}
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        className="flex-grow p-2 bg-transparent outline-none border-none text-gray-7  text-lg"
                    />

                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={generateShortUrl}>
                        {t('shortenUrl')}
                    </button>
                </div>
                {shortUrl && (
                    <div className="result">
                        <p>Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
                    </div>
                )}
                <div className="expiration-options">
                    <label>{t('expiration')}:</label>
                    {expirationOptions.map((option) => (
                        <button
                            key={option.value}
                            className={expiration === option.value ? 'active' : ''}
                            onClick={() => setExpiration(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default TinyUrlBody

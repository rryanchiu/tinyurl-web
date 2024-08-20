import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next';
import {getShortUrl, ShortenRequest, ShortenResponse} from '../../../api/tinyUrlService.ts'

const expirationOptions = [
    {label: '1 day', value: 1},
    {label: '7 days', value: 7},
    {label: '30 days', value: 30},
    {label: '1 year', value: 365},
];

const languages = [
    {label: 'English', value: 'en'},
    {label: '简体', value: 'zh_cn'},
    {label: '繁體', value: 'zh_tw'},
    {label: '日本語', value: 'ja'},
    {label: '한국어', value: 'ko'},
    {label: 'Deutsch', value: 'de'},
];

const TinyUrlBody = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [showExpireation, setShowExpiration] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentLanguage, setCurrentLanguage] = useState('');
    const [expiration, setExpiration] = useState<number>(7);

    const {t, i18n} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectLanguage = (language: string) => {
        localStorage.setItem('currentLanguage', language);
        i18n.changeLanguage(language);
        setIsOpen(false);
        setCurrentLanguage(language);
    };

    useEffect(() => {
        const init = () => {
            let language = localStorage.getItem('currentLanguage');
            if (!language) {
                language = 'en'
            }
            localStorage.setItem('currentLanguage', language);
            i18n.changeLanguage(language);
            // setIsOpen(false);
            setCurrentLanguage(language);
            // selectLanguage(language)
        };
        init();
    }, [])

    const validateUrl = (url: string) => {
        // 简单的URL正则表达式
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // 协议
            '((([a-zA-Z0-9$_.+!%]*(:[a-zA-Z0-9$_.+!%]*)?)@)?([a-zA-Z0-9.-]+(\\.[a-zA-Z]{2,6}))(:[0-9]{1,5})?(\\/.*)?$)'
        );
        return urlPattern.test(url);
    };

    const generateShortUrl = () => {

        setShortUrl('')
        setErrorMessage('');

        if (!longUrl) {
            setErrorMessage(t('pleaseEnterAURL'));
            return;
        }

        if (!validateUrl(longUrl)) {
            setErrorMessage(t('invalidUrl'));
            return;
        }

        const expireSeconds = expiration * 24 * 60 * 60;
        const data: ShortenRequest = {
            expireSeconds: expireSeconds,
            longUrl: longUrl
        }

        getShortUrl(data).then((result: ShortenResponse | undefined | null) => {
            if (!result) {
                setErrorMessage(t('failedToShortenURL') + t('resultIsEmpty'));
                return
            }
            // 检查返回的 code 是否为 0 表示成功
            if (result.code === 0 && result.data) {
                setErrorMessage('')
                setShortUrl(result.data.shortUrl);
            } else {
                setShortUrl('')
                setErrorMessage(t('failedToShortenURL') + result.message);
                return;
            }

        });
    };

    const handleCopy = () => {
        // 使用 Clipboard API 复制文字
        navigator.clipboard.writeText(shortUrl)
            .then(() => {
                alert(t('alreadyCopy'));
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
    };

    return (
        <main className="card-body">
            <div className=" card shadow-2xl shadow-black/8">
                <div className="text-align-end relative mb-15 ">
                    <div className="icon">
                        <img src="/favicon.ico" className="headericon"/> TinyURL
                    </div>
                    {/*<button*/}
                    {/*    onClick={() => setIsDark(!isDark)}*/}
                    {/*    className="m1  bg-gray-100 text-gray-800 font-semibold py-2 px-2 circle inline-flex items-center ">*/}
                    {/*    <i className="ri-moon-clear-line"></i></button>*/}
                    <button
                        onClick={() => setShowExpiration(!showExpireation)}
                        className="m1  bg-gray-100 text-gray-800 font-semibold py-2 px-2 circle inline-flex items-center ">
                        <i className="ri-time-line"></i>
                    </button>

                    <button
                        onClick={toggleDropdown}
                        className="m1 bg-gray-100 text-gray-800 font-semibold py-2 px-2 circle inline-flex items-center ">
                        <i className="ri-global-line"></i>
                    </button>
                    {isOpen && (
                        <ul className="absolute px-0 py-2 right-0 list-none mt-1 w-30 text-sm  bg-white border border-gray-200 rounded shadow-lg group-hover:block">
                            {languages.map(item => (
                                <li key={item.value}>
                                    <button onClick={() => selectLanguage(item.value)}
                                            className={'select-button ' + (currentLanguage == item.value ? 'hidden' : '')}>{item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {showExpireation && (
                    <div className="expiration-options mt-5 text-align-end text-sm">
                        <label className="font-900">{t('expiration')}:</label>
                        {expirationOptions.map((option) => (
                            <button
                                key={option.value}
                                className={(expiration === option.value ? 'bg-dark-500 text-white ' : '') + 'ml-1 text-sm px-2 py-2'}
                                onClick={() => setExpiration(option.value)}
                            >
                                {t('day_' + option.value)}
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex  bg-gray-100 p-2 pl-5 rounded-lg items-center mt-5">
                    <div className="mr-2 text-gray-500">
                        <i className="ri-links-line  text-lg"></i>
                    </div>

                    <input
                        type="text"
                        placeholder={t('enterLongUrl')}
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        className="flex-grow p-2 bg-transparent outline-none border-none text-gray-7  text-lg"
                    />

                    <button className="shorten-button" onClick={generateShortUrl}>
                        {t('shortenUrl')}
                    </button>
                </div>
                <button className="shorten-button shorten-button-sm w-full py-3 mt-5" onClick={generateShortUrl}>
                    {t('shortenUrl')}
                </button>
                {shortUrl && (
                    <>
                        <div className="border-t border-gray-300"></div>
                        <div className="flex bg-gray-100 pr-2 pl-5 rounded-lg mt-5 items-center  ">
                            <div className="mr-2 text-gray-500">
                                <i className="ri-earth-fill  text-lg"></i></div>
                            <p className="flex-grow p-1 break-all">{t('shortUrl')}: <a href={shortUrl} target="_blank"
                                                                             rel="noopener noreferrer">{shortUrl}</a>
                            </p>

                            <button
                                className="shorten-button bg-dark-200 text-white px-1.5 py-1 rounded-lg "
                                onClick={handleCopy}>
                                <i className="ri-file-copy-line"></i>
                            </button>
                        </div>
                    </>
                )}
                {errorMessage && (
                    <div className="flex bg-red-2 pr-2 pl-5 rounded-lg mt-5 items-center  ">
                        <div className="mr-2 text-gray-500">
                            <i className="ri-error-warning-line color-red-5000 font-500 text-lg"></i></div>
                        <p className="flex-grow p-1">{errorMessage}
                        </p>
                    </div>
                )}
            </div>
        </main>
    )
}

export default TinyUrlBody



const express = require('express');
const https = require('https');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function makeAPICall(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (err) {
                    reject(err);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Facebook Tools by Sameer Siins</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { 
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                .main-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .card {
                    backdrop-filter: blur(10px);
                    background: rgba(255, 255, 255, 0.95);
                    border: none;
                    border-radius: 20px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                }
                .btn-custom {
                    border-radius: 12px;
                    padding: 15px 30px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }
                .btn-primary-custom {
                    background: linear-gradient(45deg, #4267B2, #365899);
                    color: white;
                    border: 2px solid #4267B2;
                }
                .btn-primary-custom:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(66, 103, 178, 0.3);
                }
                .btn-success-custom {
                    background: linear-gradient(45deg, #42b883, #2c8e68);
                    color: white;
                    border: 2px solid #42b883;
                }
                .btn-success-custom:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(66, 184, 131, 0.3);
                }
            </style>
        </head>
        <body>
            <div class="main-container">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-body text-center p-5">
                                    <h2 class="card-title mb-4 text-primary fw-bold">Facebook Tools by Luffy Don</h2>
                                    <p class="text-muted mb-5">Choose an option to get started</p>
                                    
                                    <div class="d-grid gap-4">
                                        <a href="/token-check" class="btn btn-primary-custom btn-lg">
                                            Token Check
                                        </a>
                                        <a href="/uid-extract" class="btn btn-success-custom btn-lg">
                                            Group UID Extract
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.get('/token-check', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Token Check - Luffy Don</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { 
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                .main-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px 0;
                }
                .card {
                    backdrop-filter: blur(10px);
                    background: rgba(255, 255, 255, 0.95);
                    border: none;
                    border-radius: 20px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                }
                .btn-custom {
                    border-radius: 12px;
                    padding: 12px 25px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                .form-control {
                    border-radius: 12px;
                    padding: 15px;
                    border: 2px solid #e1e5e9;
                    transition: border-color 0.3s ease;
                }
                .form-control:focus {
                    border-color: #4267B2;
                    box-shadow: 0 0 0 0.2rem rgba(66, 103, 178, 0.25);
                }
            </style>
        </head>
        <body>
            <div class="main-container">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-8">
                            <div class="card">
                                <div class="card-body p-5">
                                    <h2 class="card-title text-center mb-4 text-primary fw-bold">Facebook Token Checker by Luffy Don</h2>
                                    
                                    <form action="/token-check" method="POST">
                                        <div class="mb-4">
                                            <label for="token" class="form-label fw-semibold">Access Token:</label>
                                            <textarea class="form-control" id="token" name="token" rows="4" 
                                                placeholder="Paste your Facebook access token here..." required></textarea>
                                        </div>
                                        
                                        <div class="d-grid gap-3">
                                            <button type="submit" class="btn btn-primary btn-lg btn-custom">
                                                Check Token
                                            </button>
                                        </div>
                                    </form>
                                    
                                    <div class="text-center mt-4">
                                        <a href="/uid-extract" class="btn btn-outline-success btn-custom me-3">
                                            Go to UID Extract
                                        </a>
                                        <a href="https://www.facebook.com/TechnicalFyter" target="_blank" class="btn btn-outline-secondary btn-custom">
                                            Owner Luffy Don
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.post('/token-check', async (req, res) => {
    const { token } = req.body;
    
    if (!token) {
        return res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error - Facebook Tools</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body class="bg-light">
                <div class="container mt-5">
                    <div class="alert alert-danger">
                        <h4>Error!</h4>
                        <p>Please provide a valid access token.</p>
                        <a href="/token-check" class="btn btn-primary">Try Again</a>
                    </div>
                </div>
            </body>
            </html>
        `);
    }

    try {
        const url = `https://graph.facebook.com/me?access_token=${token}`;
        const result = await makeAPICall(url);
        
        if (result.error) {
            throw new Error(result.error.message);
        }

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Token Valid - Facebook Tools</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body { 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        min-height: 100vh;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }
                    .main-container {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px 0;
                    }
                    .card {
                        backdrop-filter: blur(10px);
                        background: rgba(255, 255, 255, 0.95);
                        border: none;
                        border-radius: 20px;
                        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    }
                    .btn-custom {
                        border-radius: 12px;
                        padding: 12px 25px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }
                    .profile-info {
                        background: rgba(40, 167, 69, 0.1);
                        border-radius: 15px;
                        padding: 20px;
                        border-left: 5px solid #28a745;
                    }
                </style>
            </head>
            <body>
                <div class="main-container">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <div class="card">
                                    <div class="card-body p-5">
                                        <h2 class="card-title text-center mb-4 text-success fw-bold">Token is Valid!</h2>
                                        
                                        <div class="profile-info mb-4">
                                            <h5 class="text-success mb-3">Profile Information:</h5>
                                            <p class="mb-2"><strong>Name:</strong> ${result.name}</p>
                                            <p class="mb-2"><strong>User ID:</strong> ${result.id}</p>
                                            <p class="mb-0"><strong>Profile URL:</strong> 
                                                <a href="https://facebook.com/${result.id}" target="_blank" class="text-primary">
                                                    https://facebook.com/${result.id}
                                                </a>
                                            </p>
                                        </div>
                                        
                                        <div class="text-center">
                                            <a href="/uid-extract" class="btn btn-outline-success btn-custom me-3">
                                                Go to UID Extract
                                            </a>
                                            <a href="/token-check" class="btn btn-outline-primary btn-custom me-3">
                                                Check Another Token
                                            </a>
                                            <a href="/" class="btn btn-outline-secondary btn-custom">
                                                Back to Home
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Invalid Token - Facebook Tools</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body { 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        min-height: 100vh;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }
                    .main-container {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px 0;
                    }
                    .card {
                        backdrop-filter: blur(10px);
                        background: rgba(255, 255, 255, 0.95);
                        border: none;
                        border-radius: 20px;
                        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    }
                    .btn-custom {
                        border-radius: 12px;
                        padding: 12px 25px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }
                </style>
            </head>
            <body>
                <div class="main-container">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <div class="card">
                                    <div class="card-body p-5">
                                        <h2 class="card-title text-center mb-4 text-danger fw-bold">Invalid Token!</h2>
                                        
                                        <div class="alert alert-danger text-center">
                                            <h5>Error:</h5>
                                            <p class="mb-0">${error.message}</p>
                                        </div>
                                        
                                        <div class="text-center mt-4">
                                            <a href="/token-check" class="btn btn-outline-primary btn-custom me-3">
                                                Try Again
                                            </a>
                                            <a href="https://www.facebook.com/TechnicalFyter" target="_blank" class="btn btn-outline-secondary btn-custom">
                                                Owner Luffy Don
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `);
    }
});

app.get('/uid-extract', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>UID Extract - Luffy Don</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { 
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                .main-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px 0;
                }
                .card {
                    backdrop-filter: blur(10px);
                    background: rgba(255, 255, 255, 0.95);
                    border: none;
                    border-radius: 20px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                }
                .btn-custom {
                    border-radius: 12px;
                    padding: 12px 25px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                .form-control {
                    border-radius: 12px;
                    padding: 15px;
                    border: 2px solid #e1e5e9;
                    transition: border-color 0.3s ease;
                }
                .form-control:focus {
                    border-color: #42b883;
                    box-shadow: 0 0 0 0.2rem rgba(66, 184, 131, 0.25);
                }
            </style>
        </head>
        <body>
            <div class="main-container">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-8">
                            <div class="card">
                                <div class="card-body p-5">
                                    <h2 class="card-title text-center mb-4 text-success fw-bold">Group UID Extract by Luffy Don</h2>
                                    
                                    <form action="/uid-extract" method="POST">
                                        <div class="mb-4">
                                            <label for="token" class="form-label fw-semibold">Access Token:</label>
                                            <textarea class="form-control" id="token" name="token" rows="4" 
                                                placeholder="Paste your Facebook access token here..." required></textarea>
                                        </div>
                                        
                                        <div class="d-grid gap-3">
                                            <button type="submit" class="btn btn-success btn-lg btn-custom">
                                                Extract Group UIDs
                                            </button>
                                        </div>
                                    </form>
                                    
                                    <div class="text-center mt-4">
                                        <a href="/token-check" class="btn btn-outline-primary btn-custom me-3">
                                            Go to Token Check
                                        </a>
                                        <a href="https://www.facebook.com/TechnicalFyter" target="_blank" class="btn btn-outline-secondary btn-custom">
                                            Owner Luffy Don
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.post('/uid-extract', async (req, res) => {
    const { token } = req.body;
    
    if (!token) {
        return res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error - Facebook Tools</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body class="bg-light">
                <div class="container mt-5">
                    <div class="alert alert-danger">
                        <h4>Error!</h4>
                        <p>Please provide a valid access token.</p>
                        <a href="/uid-extract" class="btn btn-success">Try Again</a>
                    </div>
                </div>
            </body>
            </html>
        `);
    }

    try {
        const url = `https://graph.facebook.com/me/conversations?fields=id,name&access_token=${token}`;
        const result = await makeAPICall(url);
        
        if (result.error) {
            throw new Error(result.error.message);
        }

        let conversationsHtml = '';
        if (result.data && result.data.length > 0) {
            conversationsHtml = result.data.map((conv, index) => `
                <div class="conversation-item mb-3 p-3" style="background: rgba(66, 184, 131, 0.1); border-radius: 12px; border-left: 4px solid #42b883;">
                    <h6 class="text-success mb-2">Group ${index + 1}</h6>
                    <p class="mb-1"><strong>Name:</strong> ${conv.name || 'No name available'}</p>
                    <p class="mb-0"><strong>UID:</strong> <code class="text-primary">${conv.id}</code></p>
                </div>
            `).join('');
        } else {
            conversationsHtml = '<div class="alert alert-info">No conversations found.</div>';
        }

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Group UIDs - Luffy Don</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body { 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        min-height: 100vh;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }
                    .main-container {
                        min-height: 100vh;
                        padding: 20px 0;
                    }
                    .card {
                        backdrop-filter: blur(10px);
                        background: rgba(255, 255, 255, 0.95);
                        border: none;
                        border-radius: 20px;
                        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    }
                    .btn-custom {
                        border-radius: 12px;
                        padding: 12px 25px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }
                    .conversation-item {
                        transition: transform 0.2s ease;
                    }
                    .conversation-item:hover {
                        transform: translateY(-2px);
                    }
                </style>
            </head>
            <body>
                <div class="main-container">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-10">
                                <div class="card">
                                    <div class="card-body p-5">
                                        <h2 class="card-title text-center mb-4 text-success fw-bold">Group UIDs Extracted!</h2>
                                        
                                        <div class="results-container mb-4" style="max-height: 500px; overflow-y: auto;">
                                            <h5 class="text-success mb-3">Found ${result.data ? result.data.length : 0} Groups:</h5>
                                            ${conversationsHtml}
                                        </div>
                                        
                                        <div class="text-center">
                                            <a href="/token-check" class="btn btn-outline-primary btn-custom me-3">
                                                Go to Token Check
                                            </a>
                                            <a href="/uid-extract" class="btn btn-outline-success btn-custom me-3">
                                                Extract Again
                                            </a>
                                            <a href="/" class="btn btn-outline-secondary btn-custom">
                                                Back to Home
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error - Facebook Tools</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body { 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        min-height: 100vh;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }
                    .main-container {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px 0;
                    }
                    .card {
                        backdrop-filter: blur(10px);
                        background: rgba(255, 255, 255, 0.95);
                        border: none;
                        border-radius: 20px;
                        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    }
                    .btn-custom {
                        border-radius: 12px;
                        padding: 12px 25px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }
                </style>
            </head>
            <body>
                <div class="main-container">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <div class="card">
                                    <div class="card-body p-5">
                                        <h2 class="card-title text-center mb-4 text-danger fw-bold">Error Occurred!</h2>
                                        
                                        <div class="alert alert-danger text-center">
                                            <h5>Error:</h5>
                                            <p class="mb-0">${error.message}</p>
                                        </div>
                                        
                                        <div class="text-center mt-4">
                                            <a href="/uid-extract" class="btn btn-outline-success btn-custom me-3">
                                                Try Again
                                            </a>
                                            <a href="https://www.facebook.com/TechnicalFyter" target="_blank" class="btn btn-outline-secondary btn-custom">
                                                Owner Luffy Don 
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Token Checker and UID Extractor app is running on ${PORT} port.`);
});

module.exports = app;

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Proxy Viewer</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            min-height: 100vh;
        }

        header {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 10px;
            width: 100%;
        }

        .content {
            width: 100%;
            height: 80vh;
            overflow: auto;
        }

        .url-input {
            margin: 20px;
            padding: 10px;
            font-size: 16px;
            width: 50%;
            text-align: center;
        }

        .btn {
            background-color: #333;
            color: white;
            padding: 10px;
            font-size: 16px;
            cursor: pointer;
            border: none;
            width: 50%;
        }

        .btn:hover {
            background-color: #444;
        }
    </style>
</head>
<body>
    <header>
        <h1>Web Proxy Viewer</h1>
    </header>

    <input type="text" id="url" class="url-input" placeholder="Enter URL (e.g., https://www.reddit.com)" />
    <button class="btn" onclick="loadWebsite()">Load Website</button>

    <div class="content" id="content"></div>

    <script>
        function loadWebsite() {
            const url = document.getElementById('url').value;
            if (!url) {
                alert('Please enter a URL!');
                return;
            }

            // Make a request to our proxy server
            fetch(`http://localhost:3000/proxy?url=${encodeURIComponent(url)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch the content');
                    }
                    return response.text();
                })
                .then(data => {
                    // Display the content in the div
                    document.getElementById('content').innerHTML = data;
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to load the website.');
                });
        }
    </script>
</body>
</html>

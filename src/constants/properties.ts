export const emailText = (name: string, tempPassword: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                padding: 0;
                margin: 0;
            }
            .container {
                margin: 0 auto;
                padding: 20px;
                max-width: 600px;
                background-color: #f9f9f9;
                border: 1px solid #ddd;
                width: 100%;
                box-sizing: border-box;
            }
            .greeting {
                margin-bottom: 20px;
            }
            .content {
                margin-bottom: 20px;
            }
            .footer {
                margin-top: 30px;
            }
            a {
                color: #007BFF;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
            .highlight {
                font-weight: bold;
            }
            /* Mobile Styles */
            @media only screen and (max-width: 600px) {
                .container {
                    padding: 15px;
                }
                p {
                    font-size: 14px;
                }
                .footer {
                    margin-top: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="greeting">
                <p>Dear <span class="highlight">${name}</span>,</p>
            </div>
            <div class="content">
                <p>We received a request to reset your password.</p>
                <p>Your new password is: <strong>${tempPassword}</strong></p>
                <p>Please use this password to log in and access your account. For security reasons, we recommend you change your password after logging in.</p>
                <p>If you did not request this password reset, please contact our support immediately.</p>
            </div>
            <div class="footer">
                <p>Best regards,</p>
                <p><strong>iFocus Systec India Pvt Ltd</strong></p>
            </div>
        </div>
    </body>
    </html>
  `;
};

export const createDataMail = (
  name: string,
  employeeId: string,
  email: string,
  tempPassword: string
): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Email</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                padding: 0;
                margin: 0;
            }
            .container {
                margin: 0 auto;
                padding: 20px;
                max-width: 600px;
                background-color: #f9f9f9;
                border: 1px solid #ddd;
                width: 100%;
                box-sizing: border-box;
            }
            .greeting {
                margin-bottom: 20px;
            }
            .content {
                margin-bottom: 20px;
            }
            .footer {
                margin-top: 30px;
            }
            a {
                color: #007BFF;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
            .highlight {
                font-weight: bold;
            }
            /* Mobile Styles */
            @media only screen and (max-width: 600px) {
                .container {
                    padding: 15px;
                }
                p {
                    font-size: 14px;
                }
                .footer {
                    margin-top: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="greeting">
                <p>Dear <span class="highlight">${name}</span>,</p>
            </div>
            <div class="content">
                <p>It is our pleasure to welcome you to the <strong>iFocus Systec(India) Pvt Ltd</strong> family.</p>
                <p>Your Employee ID is <strong>${employeeId}</strong></p>
                <p>Please find below your iFocus Systec Drishti Application’s (Employee Management Portal) credential details:</p>
                <p><strong>Drishti Application link:</strong> <a href="https://drishti.wiztap.in" target="_blank">https://drishti.wiztap.in</a></p>
                <p><strong>User ID:</strong> ${email}</p>
                <p><strong>Password:</strong> ${tempPassword}</p>
                <p>Please use this user ID and password to log in to the Drishti application. For security reasons, we recommend changing your password after logging in.</p>
            </div>
            <div class="footer">
                <p>For any clarification or support, please contact the support team at <a href="internal.apps@ifocussystec.in">internal.apps@ifocussystec.in</a>.</p>
                <p>Best regards,</p>
                <p><strong>iFocus Systec India Pvt Ltd</strong></p>
            </div>
        </div>
    </body>
    </html>
  `;
};

export const updateDataMailText = (name: string, email: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login ID Change</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                padding: 0;
                margin: 0;
            }
            .container {
                margin: 0 auto;
                padding: 20px;
                max-width: 600px;
                background-color: #f9f9f9;
                border: 1px solid #ddd;
                width: 100%;
                box-sizing: border-box;
            }
            .greeting {
                margin-bottom: 20px;
            }
            .content {
                margin-bottom: 20px;
            }
            .footer {
                margin-top: 30px;
            }
            a {
                color: #007BFF;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
            .highlight {
                font-weight: bold;
            }
            /* Mobile Styles */
            @media only screen and (max-width: 600px) {
                .container {
                    padding: 15px;
                }
                p {
                    font-size: 14px;
                }
                .footer {
                    margin-top: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="greeting">
                <p>Dear <span class="highlight">${name}</span>,</p>
            </div>
            <div class="content">
                <p>I hope this message finds you well. We wanted to inform you that your Drishti login ID has been changed as per your request.</p>
                <p><strong>Drishti new login ID:</strong> ${email}</p>
                <p><strong>Password:</strong> Same as set for the old login ID.</p>
                <p>If you face any issues or have questions, please contact the Drishti support team at <a href="mailto:internal.apps@ifocussystec.in">internal.apps@ifocussystec.in</a>.</p>
            </div>
            <div class="footer">
                <p>Best regards,</p>
                <p><strong>Drishti-Internal App</strong></p>
                <p>iFocus Systec</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

import axios from "axios";
import cheerio from "cheerio";

export const singleurlController = async (req, res) => {
  try {
    const { url } = req.body;

    // Validate the URL
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    // Make an HTTP request to the specified URL
    const response = await axios.get(url);

    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const baseUrl = new URL(url);
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const extractedEmails = new Set();

      // Extract unique links using Cheerio selectors
      const uniqueLinks = new Set();
      $("a").each((index, element) => {
        const link = $(element).attr("href");
        if (link && !link.startsWith("#")) {
          const absoluteLink = new URL(link, baseUrl);
          if (absoluteLink.hostname === baseUrl.hostname) {
            uniqueLinks.add(absoluteLink.href);
          }
        }
      });

      // Define a function to process links concurrently
      async function processLink(link) {
        try {
          const response = await axios.get(link);
          const htmlContent = response.data;
          const extractedEmailsFromUrl = htmlContent.match(emailRegex) || [];
          extractedEmailsFromUrl.forEach((email) => {
            extractedEmails.add(email);
          });
        } catch (error) {
          console.error("Error extracting email addresses from", link, ":", error.message);
        }
      }

      // Process links concurrently using Promise.all
      const linkPromises = Array.from(uniqueLinks).map(processLink);

      await Promise.all(linkPromises);

      // Convert the Set of email addresses to an array
      const emailsArray = Array.from(extractedEmails);

      res.status(200).json({ emailLinks: emailsArray });
    } else {
      res.status(response.status).json({ error: "Failed to fetch the page" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};





export const multipleurlController = async (req, res) => {
  try {
    const { urls } = req.body;

    // Validate the URLs array
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: 'Invalid URLs array' });
    }

    const emailData = [];

    // Define a function to process a single URL and extract emails
    async function processUrl(url) {
      try {
        const response = await axios.get(url);

        if (response.status === 200) {
          const $ = cheerio.load(response.data);
          const baseUrl = new URL(url);
          const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
          const extractedEmails = new Set();

          // Extract unique links using Cheerio selectors
          const uniqueLinks = new Set();
          $("a").each((index, element) => {
            const link = $(element).attr("href");
            if (link && !link.startsWith("#")) {
              const absoluteLink = new URL(link, baseUrl);
              if (absoluteLink.hostname === baseUrl.hostname) {
                uniqueLinks.add(absoluteLink.href);
              }
            }
          });

          // Define a function to process links concurrently
          async function processLink(link) {
            try {
              const response = await axios.get(link);
              const htmlContent = response.data;
              const extractedEmailsFromUrl = htmlContent.match(emailRegex) || [];
              extractedEmailsFromUrl.forEach((email) => {
                extractedEmails.add(email);
              });
            } catch (error) {
              console.error("Error extracting email addresses from", link, ":", error.message);
            }
          }

          // Process links concurrently using Promise.all
          const linkPromises = Array.from(uniqueLinks).map(processLink);

          await Promise.all(linkPromises);

          // Convert the Set of extracted email addresses to an array for this URL
          const emailsArray = Array.from(extractedEmails);

          // Add the URL and its extracted emails to the emailData array
          emailData.push({ url, emails: emailsArray });
        } else {
          console.error("Failed to fetch the page:", url);
        }
      } catch (error) {
        console.error("Error processing URL", url, ":", error.message);
      }
    }

    // Process each URL sequentially
    for (const url of urls) {
      await processUrl(url);
    }

    res.status(200).json({ emailData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

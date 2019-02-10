using System;
using System.Collections.Generic;
using System.Windows.Forms;
using Newtonsoft.Json;
using System.Net.Mail;

namespace SpoilerAlertBackEnd
{
  public partial class Form1 : Form
  {
    Timer activityTimer;
    DateTime lastChecked = DateTime.MinValue;

    public Form1()
    {
      InitializeComponent();
    }

    private void Form1_Load(object sender, EventArgs e)
    {
      activityLabel.Text = "Started";
      activityTimer = new Timer();
      activityTimer.Interval = 5000;
      activityTimer.Tick += ActivityTimer_Tick;
      activityTimer.Start();
    }

    private void ActivityTimer_Tick(object sender, EventArgs e)
    {
      activityTimer.Stop();
      try
      {
        lastCheckedTimeLabel.Text = "Last Ran Tick: " + DateTime.Now;
        if (lastChecked.Date != DateTime.Today)
        {
          lastCheckedDatabaseLabel.Text = "Last Checked Database: " + DateTime.Now;
          lastChecked = DateTime.Today;
          FireSharp.Config.FirebaseConfig c = new FireSharp.Config.FirebaseConfig();
          c.AuthSecret = "NI7XHYpZL97crh1Hfh7biXC3C4FQvJIRzi8ZetcX";
          c.BasePath = "https://spoileralert-394.firebaseio.com";
          FireSharp.FirebaseClient f = new FireSharp.FirebaseClient(c);
          FireSharp.Response.FirebaseResponse r = f.Get("/");

          dynamic database = JsonConvert.DeserializeObject(r.Body);

          foreach (var user in database)
          {
            List<String> expiredItems = new List<string>();
            var id = user.Name;
            var u = user.First;
            var settings = u["settings"];
            int threshold = settings["threshold"]; 
            String emailAddress = settings["email"]; 
            bool wantNotifications = settings["notifications"];
            var l = u["fridge"];
            if (l == null)
            {
              continue;
            }
            foreach (var item in l)
            {
              var name = item.Name;
              var arr = item.Value;
              int quantity = (int)arr.First.Value;
              int daysTil = (int)arr.Last.Value;
              int updateData = daysTil - 1;
              int[] newVal = new int[2] { quantity, updateData };

              if (updateData <= threshold)
              {
                expiredItems.Add(name);
              }

              // ---- Update the database ----- //
              String path = String.Format("/{0}/fridge/{1}", id, name);
              
              f.Set(path, newVal);
            }

            // ---- Email User with any expired items
            if (wantNotifications && (expiredItems.Count > 0))
            {
              String body = "Hello there!\nThe following items from your fridge expire in ";
              body = body + threshold;
              body = body + " days: \n";
              foreach (var s in expiredItems){
                body = body + s;
                body = body + "\n";
              }

              body = body + "\nStay Fresh!\nSpoilerAlert";
              String subject = "A Message From Your Fridge";

              MailMessage mail = new MailMessage("SpoilerAlert <youremail@gmail.com>", emailAddress);
              SmtpClient client = new SmtpClient("smtp.gmail.com");
              client.Port = 587;
              client.EnableSsl = true;
              client.DeliveryMethod = SmtpDeliveryMethod.Network;
              client.UseDefaultCredentials = false;
              client.Credentials = new System.Net.NetworkCredential("youremail", "yourpassword");
              
              mail.Subject = subject;
              mail.Body = body;
              client.Send(mail);
            }
          }
        }
      }
      catch (Exception ex)
      {
        MessageBox.Show(ex.ToString());
      }
      finally
      {
        activityTimer.Start();
      }
    }
  }
}

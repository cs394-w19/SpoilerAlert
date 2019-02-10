namespace SpoilerAlertBackEnd
{
  partial class Form1
  {
    /// <summary>
    /// Required designer variable.
    /// </summary>
    private System.ComponentModel.IContainer components = null;

    /// <summary>
    /// Clean up any resources being used.
    /// </summary>
    /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
    protected override void Dispose(bool disposing)
    {
      if (disposing && (components != null))
      {
        components.Dispose();
      }
      base.Dispose(disposing);
    }

    #region Windows Form Designer generated code

    /// <summary>
    /// Required method for Designer support - do not modify
    /// the contents of this method with the code editor.
    /// </summary>
    private void InitializeComponent()
    {
      this.activityLabel = new System.Windows.Forms.Label();
      this.lastCheckedTimeLabel = new System.Windows.Forms.Label();
      this.lastCheckedDatabaseLabel = new System.Windows.Forms.Label();
      this.SuspendLayout();
      // 
      // activityLabel
      // 
      this.activityLabel.AutoSize = true;
      this.activityLabel.Location = new System.Drawing.Point(82, 38);
      this.activityLabel.Name = "activityLabel";
      this.activityLabel.Size = new System.Drawing.Size(38, 17);
      this.activityLabel.TabIndex = 0;
      this.activityLabel.Text = "Start";
      // 
      // lastCheckedTimeLabel
      // 
      this.lastCheckedTimeLabel.AutoSize = true;
      this.lastCheckedTimeLabel.Location = new System.Drawing.Point(82, 94);
      this.lastCheckedTimeLabel.Name = "lastCheckedTimeLabel";
      this.lastCheckedTimeLabel.Size = new System.Drawing.Size(85, 17);
      this.lastCheckedTimeLabel.TabIndex = 1;
      this.lastCheckedTimeLabel.Text = "Last ran tick";
      // 
      // lastCheckedDatabaseLabel
      // 
      this.lastCheckedDatabaseLabel.AutoSize = true;
      this.lastCheckedDatabaseLabel.Location = new System.Drawing.Point(82, 155);
      this.lastCheckedDatabaseLabel.Name = "lastCheckedDatabaseLabel";
      this.lastCheckedDatabaseLabel.Size = new System.Drawing.Size(157, 17);
      this.lastCheckedDatabaseLabel.TabIndex = 2;
      this.lastCheckedDatabaseLabel.Text = "Last checked Database";
      // 
      // Form1
      // 
      this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.ClientSize = new System.Drawing.Size(562, 253);
      this.Controls.Add(this.lastCheckedDatabaseLabel);
      this.Controls.Add(this.lastCheckedTimeLabel);
      this.Controls.Add(this.activityLabel);
      this.Name = "Form1";
      this.Text = "Form1";
      this.Load += new System.EventHandler(this.Form1_Load);
      this.ResumeLayout(false);
      this.PerformLayout();

    }

    #endregion

    private System.Windows.Forms.Label activityLabel;
    private System.Windows.Forms.Label lastCheckedTimeLabel;
    private System.Windows.Forms.Label lastCheckedDatabaseLabel;
  }
}


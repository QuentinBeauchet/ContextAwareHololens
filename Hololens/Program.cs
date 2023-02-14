using StereoKit;
using System;
using Windows.UI.ViewManagement;

namespace project_test
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // Initialize StereoKit
            SKSettings settings = new SKSettings
            {
                appName = "project_test",
                assetsFolder = "Assets",
            };
            if (!SK.Initialize(settings))
                Environment.Exit(1);

            // Create assets used by the app

            Pose windowsPose = new Pose(0, 0, -0.5f, Quat.LookDir(0, 0, 1));

            // Core application loop
            while (SK.Step(() =>
            {

                UI.WindowBegin("Menu", ref windowsPose);
                UI.Label("test");
                UI.Button("Do Thing");
                if (UI.Button("exit"))
                    SK.Quit();
                UI.WindowEnd();


            })) ;
            SK.Shutdown();
        }
    }
}
